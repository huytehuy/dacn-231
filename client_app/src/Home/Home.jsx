import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bg1 from '../CSS/Image/1.jpg'
import bg2 from '../CSS/Image/2.jpg'
import bg3 from '../CSS/Image/3.jpg'
import bg5 from '../CSS/Image/5.jpg'
import bg6 from '../CSS/Image/6.jpg'
import bg7 from '../CSS/Image/7.jpg'
import Home_Category from './Component/Home_Category';
import Home_Product from './Component/Home_Product';
import Product from '../API/Product';
import { changeCount } from '../Redux/Action/ActionCount';
import { useDispatch, useSelector } from 'react-redux';
import CartsLocal from '../Share/CartsLocal';
import SaleAPI from '../API/SaleAPI';
import ChatGpt from '../ChatGPT/script';
// import { Checkbox } from '@mantine/core';
Home.propTypes = {

};

function Home(props) {

    // state dùng để thay đổi và hiển thị modal
    const [id_modal, set_id_modal] = useState('')

    const [product_detail, set_product_detail] = useState([])
    const [product, set_product] = useState([])

    const dispatch = useDispatch()

    const [priceSale, setPriceSale] = useState(0)

    const GET_id_modal = (value, price) => {

        set_id_modal(value)

        setPriceSale(price)

    }

    const [sale, setSale] = useState([])
    const productTemp = [];

    useEffect(() => {

        if (id_modal !== '') {

            const fetchData = async () => {

                const response = await Product.Get_Detail_Product(id_modal);
                set_product_detail(response);
            }
            fetchData();
        }

    }, [id_modal])

    useEffect(()=>{
        const fetchData = async () => {
            const response = await Product.Get_All_Product();
            set_product(response);
        }
        fetchData();
    },[])


    // Get count từ redux khi user chưa đăng nhập
    const count_change = useSelector(state => state.Count.isLoad)

    // Hàm này dùng để thêm vào giỏ hàng
    const handler_addcart = (e) => {

        e.preventDefault()

        const data = {
            id_cart: Math.random().toString(),
            id_product: id_modal,
            name_product: product_detail.name_product,
            price_product: product_detail.price_product,
            count: 1,
            image: product_detail.image,
            size: 'S',
        }

        CartsLocal.addProduct(data)

        const action_count_change = changeCount(count_change)
        dispatch(action_count_change)

    }

    function SetArray(product){
    product&&product.map((index)=>{productTemp.push(index.gender)})
    }

    SetArray(product);


    return (
        <div className="container">
            <div className="slider-with-banner">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div>
                            <div className="carousel-inner">
                                <div className="single-slide align-center-left animation-style-01 bg-1" 
                                    style={{ backgroundImage: `url(https://theme.hstatic.net/1000248237/1000325770/14/slideshow_4.jpg?v=31)`}}>
                                    <div className="slider-progress"></div>

                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                        <div className="li-banner">
                            <a href="#">
                                <img src="https://tongkhodogiadung.vn/wp-content/uploads/2021/07/banner.jpg" alt="" />
                            </a>
                        </div>
                    </div> */}
                    {/* <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                    <div className="li-banner mt-15 mt-sm-30 mt-xs-30">
                            <a href="#">
                                <img src="https://kangaroovietnam.vn/Uploads/banner-slide-sale-1212.png" alt="" />
                            </a>
                        </div>
                        </div> */}
                </div>
            </div>


            <Home_Category GET_id_modal={GET_id_modal} />

            <div className="li-static-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 text-center">
                            <div className="single-banner">
                                <a href="#">
                                    <img style={{height:340}} src="https://img.freepik.com/free-photo/sale-with-special-discount-vr-glasses_23-2150040388.jpg?size=626&ext=jpg&ga=GA1.1.1497148693.1705063387&semt=ais" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner" style={{marginBottom:15}}>
                                <a href="#">
                                    <img style={{height:190}}src="https://alaskavietnam.org/wp-content/uploads/2020/08/banner-alaska-tu-dong-2020-02.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                            <div className="single-banner">
                                <a href="#">
                                    <img src="https://dienlanhhanoi.net.vn/wp-content/uploads/2023/04/sua-tu-lanh-hitachi-2.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner">
                                <a href="#">
                                    <img src="https://image.freepik.com/free-vector/fashion-sale-banners_52683-11557.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Array.from(new Set(productTemp)).map((index,value)=><Home_Product gender={index} category={index} GET_id_modal={GET_id_modal} />)}
            {/* <Home_Product gender={`Male`} category={'655a1fc0a456ecf4093e1e6f'} GET_id_modal={GET_id_modal} />
            <Home_Product gender={`Female`} category={'655a1fc0a456ecf4093e1e6f'} GET_id_modal={GET_id_modal} />
            <Home_Product gender={`Kitchen`} category={'655a1fc0a456ecf4093e1e6q'} GET_id_modal={GET_id_modal} /> */}
            {/* {product&&product.filter((item, index) => product.indexOf(item) === index)} */}


            {/* <ChatGpt/> */}


{/* 
            <Checkbox
      defaultChecked
      label="I agree to sell my privacy"
    /> */}
            {/* <Home_Product gender={`Female`} category={'60615da34c9cac0448b4b9a8'} GET_id_modal={GET_id_modal} /> */}


            <div className="modal fade modal-wrapper" id={id_modal} >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-inner-area row">
                                <div className="col-lg-5 col-md-6 col-sm-6">
                                    <div className="product-details-left">
                                        <div className="product-details-images slider-navigation-1">
                                            <div className="lg-image">
                                                <img src={product_detail.image} alt="product image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-6">
                                    <div className="product-details-view-content pt-60">
                                        <div className="product-info">
                                            <h2>{product_detail.name_product}</h2>
                                            <div className="rating-box pt-20">
                                                <ul className="rating rating-with-review-item">
                                                    <li><i className="fa fa-star-o"></i></li>
                                                    <li><i className="fa fa-star-o"></i></li>
                                                    <li><i className="fa fa-star-o"></i></li>
                                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                                    <li className="no-star"><i className="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <div className="price-box pt-20">
                                            {
                                                priceSale ? (<del className="new-price new-price-2" style={{ color: '#525252'}}>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(product_detail.price_product)+ ' VNĐ'}</del>) :
                                                <span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(product_detail.price_product)+ ' VNĐ'}</span>
                                            }
                                            <br />
                                            {
                                               priceSale && <span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(priceSale) + ' VNĐ'}</span>
                                            }
                                            </div>
                                            <div className="product-desc">
                                            {product_detail.description&&product_detail.description.map((index)=><div>- {index}</div>)}
                                            </div>
                                            <div className="single-add-to-cart">
                                                <form onSubmit={handler_addcart} className="cart-quantity">
                                                    <button className="add-to-cart" type="submit">Add to cart</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;