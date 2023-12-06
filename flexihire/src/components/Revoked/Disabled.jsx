import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Disabled.css';

const Disabled = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Revoked component is being rendered.');
    }, []);

    const handleMailUsClick = () => {
        navigate('/mailRevoke');
    };

    return (
        <div className="mainRevoke">
            <div className="bg-purple">
                {console.log('Content of Revoked component is being rendered.')}
                <div className="stars">
                    <div className="central-body">
                        <img
                            className="image-404"
                            src="http://salehriaz.com/404Page/img/404.svg"
                            width="300px"
                            alt="404"
                        />
                        <button className="btn-go-home" onClick={handleMailUsClick}>
                            MAIL US
                        </button>
                    </div>
                    <div className="objects">
                        <img
                            className="object_rocket"
                            src="http://salehriaz.com/404Page/img/rocket.svg"
                            width="40px"
                            alt="Rocket"
                        />
                        <div className="earth-moon">
                            <img
                                className="object_earth"
                                src="http://salehriaz.com/404Page/img/earth.svg"
                                width="100px"
                                alt="Earth"
                            />
                            <img
                                className="object_moon"
                                src="http://salehriaz.com/404Page/img/moon.svg"
                                width="80px"
                                alt="Moon"
                            />
                        </div>
                        <div className="box_astronaut">
                            <img
                                className="object_astronaut"
                                src="http://salehriaz.com/404Page/img/astronaut.svg"
                                width="140px"
                                alt="Astronaut"
                            />
                        </div>
                    </div>
                    <div className="glowing_stars">
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Disabled;
