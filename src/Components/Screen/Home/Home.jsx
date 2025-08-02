import { getAPIdata } from "../../../Networking/getAPIdata";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Container,Row,Col } from "react-bootstrap";

import { addTen } from "../../../ReduxStore/productReducer";

import { CardComp } from "../../Card/CardComp";
import { CircleLoaderFn } from "../../Spinners/CircleLoader";
import { NavBar } from "../../NavBar/NavBar";

import { increaseSkip } from "../../../ReduxStore/skipReducer";
import { useNavigate } from "react-router";
import { addItemToCart, removeItemFromCart } from "../../../ReduxStore/cartReducer";



export const Home = ()=> {

    const dispatch = useDispatch();
    const allProducts = useSelector((store) => store.productRed.items);         //Getting all products from redux
    const skip = useSelector((store) => store.skipRed.skip);                    //Getting the current value of item to 'skip'
    const navigate=useNavigate();


    const[loading, setLoading]=useState(true);                  //For initial loader
    const[loadingMore, setLoadingMore]=useState(false);         //For Loader in between two batches of products

     const getTenPost = async()=>{

        try{
            
            const result = await getAPIdata(skip);
            
        if(result.status==="Success")
        {
            dispatch(addTen(result.data.post.products));                //Setting fetched data in redux calling 'addTen' reducer using dispatch()
            console.log(result.data.post.products);
        }
        else{

            console.log("Error 404 ! Data not Found")
        }
        }
        catch(err)
        {
            console.log("Error", err);
        }
        finally{
            setLoading(false);
            setLoadingMore(false);
        }

    }

    const handleScroll = ()=>{

        const{scrollTop, scrollHeight, clientHeight}=document.documentElement;

        if(scrollTop+clientHeight >= scrollHeight)                      //Checking if client is reached at the end of page whlle scrolling
        {
            dispatch(increaseSkip());                           //Incresing skip value by 10 with each each time condition becomes true
            setLoadingMore(true);
        }

        console.log(scrollTop, scrollHeight, clientHeight);
    }


    useEffect(() => {

        if(allProducts.length===0){             //For initial render - happens only when redux is empty
        setTimeout(()=>{
            getTenPost();
        }, 2000);
    }

    }, []);

    useEffect(()=>{
    
        window.addEventListener("scroll", handleScroll);        //Registering scroll event to execute infinite scrolling

        return ()=> window.removeEventListener("scroll", handleScroll)      //cleaning up the event on unmounting

    }, [])

    useEffect(() => {

        if(skip>0)                      //Fetching 10 products apart from initial render inly when skip value is not 0 or it is changed
        {
             setTimeout(()=>{
            getTenPost();
        }, 2000);
        }

    }, [skip])


    return(
    
        <>
        <NavBar/>
            {
                loading && allProducts.length===0 ? <CircleLoaderFn marginTop="20%" loading={loading}/> : null
            }
            <Container>
                <Row>
            {
              
                allProducts && allProducts.length>0 ? 

                allProducts.map((item) => (
                    <>
                    {console.log(allProducts.length)
                    }
                   <Col md="4" key={item.id}>

                    {/* Navigating to a dynamic URL based on the product ID as variable so that we can get that url using useParams and pass to getAPIdetail() to fetch detail of that particular product */}

                   <CardComp id={item.id} removeItemFromCart={()=> {dispatch(removeItemFromCart(item))}} addToCartClick={()=> {dispatch(addItemToCart(item))}} onClick={() => navigate(`/product/${item.id}`)} thumbnail={item.thumbnail} title={item.title} description={item.description} rating={item.rating}  price={item.price}  discountPercentage={item.discountPercentage} shippingInformation={item.shippingInformation}/>
                   
                   
                   </Col>
                    </>
                ))
                
                : null
            
            }
            </Row>
            </Container>

            {/* {console.log("loading")} */}
            {
                loadingMore? <CircleLoaderFn marginTop="0%" loading={loadingMore}/> :null
                
            }
    
        </>
    );
}
