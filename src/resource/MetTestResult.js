import React, { useState } from 'react';
import axios from 'axios';
import '../css/MetTestResult.css'

const MetTestResult = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    // 이미지 선택 핸들러
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    // 이미지 업로드 핸들러
    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            // 이미지를 업로드할 서버 엔드포인트로 POST 요청 보내기
            const response = await axios.post('/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('이미지가 성공적으로 업로드되었습니다:', response.data);
            // 이미지 업로드 후 처리할 내용 추가

        } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error);
            // 오류 처리 추가
        }
    };

    return (
        <div className='result-box'>
            <div className='title-box'>
                <img className='meticon' src='./img/MetResult.png' alt='Met Icon'/>
                <span className='mettitle'>검사결과</span>
            </div>
            {/* 이미지 선택 input */}
            {/* <input type="file" accept="image/*" onChange={handleImageChange}></input> */}
            <button className='custom-button' onClick={handleImageUpload}>저장</button>
            <label className="custom-button">
                <input type="file" onChange={handleImageChange} />
                입력
            </label>
            <br/><br/>
            {/* 선택한 이미지 미리보기 */}
            {selectedImage && (
                <div>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '600px' }} />
                </div>
            )}

            
        </div>
    );
};

export default MetTestResult;