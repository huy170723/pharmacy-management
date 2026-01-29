import React, { useState } from 'react';
import HealthLayout from '../components/HealthLayout';

const BMRTDEEPage = () => {
    // 1. Khai báo State
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState(1.55); // Mặc định là vừa phải
    const [result, setResult] = useState(null);

    const styles = {
        card: { border: '1px solid #edf2f7', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', backgroundColor: '#fff' },
        cardHeader: { backgroundColor: '#1250dc', color: 'white', padding: '15px 25px', display: 'flex', alignItems: 'center' },
        cardBody: { padding: '30px 25px' },
        label: { display: 'block', marginBottom: '10px', color: '#4a5568', fontSize: '14px', fontWeight: '500' },
        inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
        input: { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' },
        unit: { position: 'absolute', right: '15px', color: '#a0aec0', fontSize: '13px' },
        btnPrimary: { flex: 2, backgroundColor: '#1250dc', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
        btnSecondary: { flex: 1, backgroundColor: '#f7fafc', color: '#4a5568', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
        resultContainer: { marginTop: '25px', padding: '20px', borderRadius: '8px', backgroundColor: '#ebf4ff', border: '1px solid #bee3f8' }
    };

    // 2. Hàm tính toán
    const calculateBMR_TDEE = () => {
        if (!age || !weight || !height) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Công thức Mifflin-St Jeor
        let bmrValue = (10 * weight) + (6.25 * height) - (5 * age);
        if (gender === 'male') {
            bmrValue += 5;
        } else {
            bmrValue -= 161;
        }

        const tdeeValue = bmrValue * activity;

        setResult({
            bmr: Math.round(bmrValue),
            tdee: Math.round(tdeeValue)
        });
    };

    // 3. Hàm Reset
    const handleReset = () => {
        setGender('male');
        setAge('');
        setWeight('');
        setHeight('');
        setActivity(1.55);
        setResult(null);
    };

    return (
        <HealthLayout>
            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <span style={{ fontSize: '20px' }}>🔥</span>
                    <strong style={{ marginLeft: '10px', fontSize: '18px' }}>Tính BMR & TDEE</strong>
                </div>

                <div style={styles.cardBody}>
                    {/* Giới tính */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={styles.label}>Giới tính</label>
                        <div style={{ display: 'flex', gap: '30px', marginTop: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} style={{ marginRight: '8px' }} /> Nam
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} style={{ marginRight: '8px' }} /> Nữ
                            </label>
                        </div>
                    </div>

                    {/* Chỉ số cơ thể */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <label style={styles.label}>Tuổi (năm)</label>
                            <div style={styles.inputWrapper}>
                                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="vd: 25" style={styles.input} />
                                <span style={styles.unit}>tuổi</span>
                            </div>
                        </div>
                        <div>
                            <label style={styles.label}>Cân nặng (kg)</label>
                            <div style={styles.inputWrapper}>
                                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="vd: 70" style={styles.input} />
                                <span style={styles.unit}>kg</span>
                            </div>
                        </div>
                        <div>
                            <label style={styles.label}>Chiều cao (cm)</label>
                            <div style={styles.inputWrapper}>
                                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="vd: 175" style={styles.input} />
                                <span style={styles.unit}>cm</span>
                            </div>
                        </div>
                    </div>

                    {/* Mức độ vận động */}
                    <div style={{ marginBottom: '25px' }}>
                        <label style={styles.label}>Mức độ hoạt động</label>
                        <select style={styles.input} value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))}>
                            <option value={1.2}>Ít vận động (văn phòng)</option>
                            <option value={1.375}>Vận động nhẹ (1-3 ngày/tuần)</option>
                            <option value={1.55}>Hoạt động vừa phải (3-5 ngày/tuần)</option>
                            <option value={1.725}>Vận động nhiều (6-7 ngày/tuần)</option>
                            <option value={1.9}>Vận động cực nhiều (Vận động viên)</option>
                        </select>
                    </div>

                    {/* Nút điều khiển */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={calculateBMR_TDEE} style={styles.btnPrimary}>TÍNH BMR & TDEE</button>
                        <button onClick={handleReset} style={styles.btnSecondary}>ĐẶT LẠI</button>
                    </div>

                    {/* Hiển thị kết quả */}
                    {result && (
                        <div style={styles.resultContainer}>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>BMR (Tỷ lệ trao đổi chất cơ bản):</strong>
                                <span style={{ color: '#1250dc', fontSize: '20px', marginLeft: '10px' }}>{result.bmr} kcal</span>
                            </div>
                            <div>
                                <strong>TDEE (Tổng lượng calo tiêu thụ hàng ngày):</strong>
                                <span style={{ color: '#e53e3e', fontSize: '20px', marginLeft: '10px' }}>{result.tdee} kcal</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#718096', marginTop: '10px' }}>
                                * Để giảm cân, bạn nên ăn ít hơn TDEE khoảng 300-500 calo.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </HealthLayout>
    );
};

export default BMRTDEEPage;