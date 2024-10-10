import React from 'react'


const Page = async ({ params } : {
    params: {
        handel: string  
    }
}) => {
    return (
        <div>Page { params.handel}</div>
      )
}

export default Page