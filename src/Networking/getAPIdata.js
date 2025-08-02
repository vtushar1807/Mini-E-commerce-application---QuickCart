export const getAPIdata = async (skip)=>{

        try{
            console.log(skip);
            
            const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`, {method:"GET"});
            const result = await response.json();

            return({
                status:"Success",
                data:{
                    post:result,
                }
            })

        }
        catch(error)
        {
            return({
                status:"Failed",
                data:error,
            })

        }
}