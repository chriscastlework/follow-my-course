"use server";
import prisma from "@/db/prisma";
import { centsToDollars } from "@/lib/utils";
import { checkAuthStatus } from "../auth/callback/actions";
import { stripe } from "@/lib/stripe";

type EbookArgs = {
  title: string;
  description: string;
  price: string;
  mediaUrl: string;
};

type CourseArgs = {
  title: string;
  description: string;
  price: string;
};

type PostArgs = {
  text: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  isPublic: boolean;
};

type ProductArgs = {
  name: string;
  image: string;
  price: string;
};

async function checkAdminAuthorization() {
  const { isCreator: isCreator, user } = await checkAuthStatus();
  if (!isCreator) {
    throw new Error("Unauthorized");
  }
  return user;
}

function validateRequiredFields(
  fields: Record<string, any>,
  errorMessage: string
) {
  if (Object.values(fields).some((field) => !field)) {
    throw new Error(errorMessage);
  }
}

function convertPriceToCents(price: string): number {
  const priceInCents = Math.round(parseFloat(price) * 100);
  if (isNaN(priceInCents)) {
    throw new Error("Price must be a valid number");
  }
  return priceInCents;
}

async function createStripeProduct(
  name: string,
  description: string,
  priceInCents: number
) {
  const stripeProduct = await stripe.products.create({ name, description });
  await stripe.prices.create({
    product: stripeProduct.id,
    unit_amount: priceInCents,
    currency: "usd",
  });
  return stripeProduct.id;
}

export const createEbookActionUsingAppwrite = async ({
  title,
  description,
  price,
  mediaUrl,
}: EbookArgs) => {
  console.log("testing create ebook action is running on server");
  const user = await checkAdminAuthorization();
  validateRequiredFields(
    { title, description, price, mediaUrl },
    "Please provide all the required fields"
  );
  const priceInCents = convertPriceToCents(price);
  const stripeProductId = await createStripeProduct(
    title,
    description,
    priceInCents
  );

  const newEbook = await prisma.ebook.create({
    data: {
      title,
      description,
      price: priceInCents,
      creatorId: user!.id,
      stripeProductId,
      mediaUrl,
    },
  });

  return { success: true, ebook: newEbook };
};

export const createEbookAction = async ({
  title,
  description,
  price,
  mediaUrl,
}: EbookArgs) => {
  console.log("testing create ebook action is running on server");
  const user = await checkAdminAuthorization();
  validateRequiredFields(
    { title, description, price, mediaUrl },
    "Please provide all the required fields"
  );
  const priceInCents = convertPriceToCents(price);
  const stripeProductId = await createStripeProduct(
    title,
    description,
    priceInCents
  );

  const newEbook = await prisma.ebook.create({
    data: {
      title,
      description,
      price: priceInCents,
      creatorId: user!.id,
      stripeProductId,
      mediaUrl,
    },
  });

  return { success: true, ebook: newEbook };
};

export async function createCourseAction({
  title,
  description,
  price,
}: CourseArgs) {
  // sleep thread for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const user = await checkAdminAuthorization();
  validateRequiredFields(
    { title, description, price },
    "Please provide all the required fields"
  );
  const priceInCents = convertPriceToCents(price);
  const stripeProductId = await createStripeProduct(
    title,
    description,
    priceInCents
  );

  const newCourse = await prisma.course.create({
    data: {
      stripeProductId,
      title,
      description,
      price: priceInCents,
      creatorId: user!.id,
    },
  });

  return { success: true, course: newCourse };
}

export async function createPostAction({
  isPublic,
  mediaUrl,
  mediaType,
  text,
}: PostArgs) {
  const user = await checkAdminAuthorization();
  const newPost = await prisma.post.create({
    data: { text, mediaUrl, mediaType, isPublic, userId: user!.id },
  });

  return { success: true, post: newPost };
}

export async function getAllProductsAction() {
  await checkAdminAuthorization();
  return prisma.product.findMany();
}

export async function addNewProductToStoreAction({
  name,
  image,
  price,
}: ProductArgs) {
  await checkAdminAuthorization();
  validateRequiredFields(
    { name, image, price },
    "Please provide all the required fields"
  );
  const priceInCents = convertPriceToCents(price);

  const newProduct = await prisma.product.create({
    data: { image, price: priceInCents, name },
  });

  return { success: true, product: newProduct };
}

export async function toggleProductArchiveAction(productId: string) {
  await checkAdminAuthorization();
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new Error("Product not found");
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: { isArchived: !product.isArchived },
  });

  return { success: true, product: updatedProduct };
}

export async function getDashboardData() {
  const [
    totalRevenueResult,
    totalSales,
    totalSubscriptions,
    recentSales,
    recentSubscriptions,
  ] = await Promise.all([
    Promise.all([
      prisma.order.aggregate({ _sum: { price: true } }),
      prisma.subscription.aggregate({ _sum: { price: true } }),
    ]),
    prisma.order.count(),
    prisma.subscription.count(),
    prisma.order.findMany({
      take: 4,
      orderBy: { orderDate: "desc" },
      select: {
        user: { select: { name: true, email: true, image: true } },
        price: true,
        orderDate: true,
      },
    }),
    prisma.subscription.findMany({
      take: 4,
      orderBy: { startDate: "desc" },
      select: {
        subscriber: { select: { name: true, email: true, image: true } },
        price: true,
        startDate: true,
      },
    }),
  ]);

  const totalRevenue =
    (totalRevenueResult[0]._sum.price || 0) +
    (totalRevenueResult[1]._sum.price || 0);

  return {
    totalRevenue: centsToDollars(totalRevenue),
    totalSales,
    totalSubscriptions,
    recentSales,
    recentSubscriptions,
  };
}
