import { useEffect,useState } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router';
import { getAPIdetail } from '../../../Networking/getAPIdetail';
import { useDispatch, useSelector } from 'react-redux';
import { addProductDetail } from '../../../ReduxStore/productDetailReducer';
import { CircleLoaderFn } from '../../Spinners/CircleLoader';


import { Container, Row, Col } from 'react-bootstrap';
import { NavBar } from '../../NavBar/NavBar';
import { cleanProductDetail } from '../../../ReduxStore/productDetailReducer';

export const ProductDetail = ()=>{

    const item = useSelector((store) => store.productDetailRed.itemDetail);             //Getting the detail of the product on which user clicked
    const params = useParams();                     //For reading the variable passed dynamically in url
    const dispatch = useDispatch();

    const[loading, setLoading]=useState(true);

    useEffect(()=>{

        setTimeout(()=>{
            getProductDetail();
        }, 2000)

        return ()=> dispatch(cleanProductDetail());

    }, [])


     const handleActualPrice = (dPrice, dPercent)=>
    {
        const num = parseFloat(dPrice/(1-(dPercent/100)));
            return num.toFixed(2);
    }

    const getProductDetail = async()=>{

        try{
            const result = await getAPIdetail(params.id);           //Fetching the detail of the product based on its id, read from url with the help of useParams()

        if(result.status==="Success"){
        dispatch(addProductDetail(result.data.post));       //Setting product detail into store using addProductDetail reducer
        console.log(result.data.post);
        
        }

        }
        catch(arr)
        {
            console.log("Error", err)
        }
        finally{
            setLoading(false);
        }

    }

    
    return(
        <>

        <NavBar/>
        {loading ? <CircleLoaderFn loading={loading} marginTop="20%" /> : null}
        {console.log(item)}
        {item && Object.keys(item).length>0 ? 


        <>
        <Container className='main-detail' fluid="0">
        <Row className="main-detail d-flex w-100" key={item.id}>
            

        <Col md="6" className="left-detail w-50">
    {
        item.images.length===1?
    
        <Card className='w-70 m-4'>
        <Card.Img className='h-75' variant="top" src={item.images} />
        </Card>

    :

    <Carousel className='m4' data-bs-theme="dark">
      
    {
        item.images.map((item) => (
            <Carousel.Item className='bg-white mt-4' key={item.id}>
                <img style={{height:"700px"}}  src={item} alt="" />
            </Carousel.Item>

        ))
    }
    </Carousel>
    }
        

        </Col>

        <Col md="6" className="right-detail w-40 mt-4">
            <h4 className='fw-bold'>{item.title}</h4>
            <p>{item.brand}</p>

            <span style={{borderRadius:"7px", fontSize:"11px",padding:"1px 6px 3px"}} className='text-white bg-success'>{item.availabilityStatus}</span>
            <span style={{borderRadius:"7px", fontSize:"11px", padding:"1px 6px 3px"}} className='text-white bg-primary  '>{item.category}</span>
            
            <div style={{whiteSpace:"wrap"}} className='w-100 mt-3'>
                {item.description}
            </div>

        <div className='mt-3'>
            <span className='text-primary fs-4 mt-4 fw-bold'>${item.price}</span>
            <span className='text-secondary text-decoration-line-through fw-bold'>${handleActualPrice(item.price, item.discountPercentage)}</span>
            <span style={{borderRadius:"5px"}} className='text-white bg-danger p-1 fw-bold'>{item.discountPercentage}% OFF</span>
        </div>

            <div className='bg-white mt-4 p-2'><h6 className='fw-bold'>Rating: </h6>⭐{item.rating}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Stock: </h6>{item.stock}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Dimensions: </h6>{item.dimensions.width} x {item.dimensions.height} x {item.dimensions.depth}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Weight: </h6>{item.weight}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Shipping: </h6>{item.shippingInformation}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Warranty: </h6>{item.warrantyInformation}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Return Policy: </h6>{item.returnPolicy}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>SKU: </h6>{item.sku}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Tags: </h6>
            
            {item.tags.map((ele) => (
                
                
                <span style={{borderRadius:"7px", fontSize:"11px",padding:"1px 6px 2px"}} className='text-white bg-secondary p-1'>{ele}</span>
                
            ))}
            
            </div>
        </Col>

        </Row>


        <div className='p-3'>
            <h3 className='m-3'>🗣️Customer Reviews</h3>
           {
            item.reviews.map((ele) => (
                <div className='bg-white p-4 m-3 comment-div'>
                    <span className='fw-bold'>⭐{ele.rating} - {ele.reviewerName}</span>  <span className='float-detail'>{ele.date.slice(0,10)} | {ele.reviewerEmail}</span><br/>
                    <span className='product-comment'>{ele.comment}</span>

                </div>
            ))
           }

        </div>
        
        </Container>
        
        </>
        :null
        }
        
        </>
    )
}