import BaseLayout from '@/components/BaseLayout'
import UseLocalStorage from '@/components/UseLocalStorage'
import React, { useEffect } from 'react'



const Page = async ({ params } : {
    params: {
        handel: string  
    }
}) => {

    console.log('Page', params.handel);


    return (
        <div> <UseLocalStorage />Course { params.handel } </div >
        // <BaseLayout renderRightPanel={false}>
		// </BaseLayout>
      )
}

export default Page