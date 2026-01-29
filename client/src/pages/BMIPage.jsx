import React, { useState } from 'react';
import HealthLayout from '../components/HealthLayout';

const BMIPage = () => {
    // 1. Khai báo State để lưu trữ dữ liệu
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState('');

    // 2. Hàm tính toán BMI
    const calculateBMI = () => {
        if (weight > 0 && height > 0) {
            // Công thức: BMI = Cân nặng / (Chiều cao/100)^2
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);

            // Phân loại chỉ số BMI
            if (bmiValue < 18.5) {
                setMessage('Bạn đang gầy (Thiếu cân)');
            } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
                setMessage('Cân nặng của bạn bình thường (Lý tưởng)');
            } else if (bmiValue >= 25 && bmiValue < 29.9) {
                setMessage('Bạn đang tiền béo phì (Thừa cân)');
            } else {
                setMessage('Bạn đang bị béo phì');
            }
        } else {
            alert("Vui lòng nhập cân nặng và chiều cao hợp lệ!");
        }
    };

    // 3. Hàm đặt lại (Reset)
    const resetForm = () => {
        setWeight('');
        setHeight('');
        setBmi(null);
        setMessage('');
    };

    return (
        <HealthLayout>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                <span style={{ fontSize: '24px' }}>⚖️</span>
                <h2 style={{ margin: 0, color: '#1250dc' }}>Tính BMI</h2>
            </div>

            {/* Form nhập liệu */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                    <label style={labelStyle}>Cân nặng (kg)</label>
                    <input
                        type="number"
                        placeholder="vd: 65"
                        style={inputStyle}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Chiều cao (cm)</label>
                    <input
                        type="number"
                        placeholder="vd: 170"
                        style={inputStyle}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
            </div>

            {/* Nút bấm */}
            <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                <button onClick={calculateBMI} style={btnPrimary}>Tính BMI</button>
                <button onClick={resetForm} style={btnSecondary}>Đặt lại</button>
            </div>

            {/* Hiển thị kết quả */}
            {bmi && (
                <div style={resultBox}>
                    <h3 style={{ color: '#1250dc', margin: '0 0 10px 0' }}>Kết quả của bạn:</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Chỉ số BMI: {bmi}</p>
                    <p style={{ fontSize: '16px', color: '#555' }}>Tình trạng: <strong>{message}</strong></p>
                </div>
            )}
        </HealthLayout>
    );
};

// Styles bổ trợ
const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const btnPrimary = { backgroundColor: '#1250dc', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' };
const btnSecondary = { backgroundColor: '#f0f0f0', color: '#555', border: 'none', padding: '12px 40px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' };
const resultBox = { marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px', border: '1px solid #e0e0e0', textAlign: 'center' };

export default BMIPage;