export const getAPIdetail = async (id)=>{


    try{
        const response = await fetch(`https://dummyjson.com/products/${id}`, {method:"GET"});
        const result = await response.json();

        return({
            status:"Success",
            data:{
                post:result,
            }
        })
    }
    catch(err)
    {
        return({
            status:"Failed",
            data:err,
        })

    }
}
