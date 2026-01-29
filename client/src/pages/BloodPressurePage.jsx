import React, { useState } from 'react';
import HealthLayout from '../components/HealthLayout';

const BloodPressurePage = () => {
    // 1. Khai báo State quản lý nhập liệu và kết quả
    const [systolic, setSystolic] = useState(''); // Tâm thu
    const [diastolic, setDiastolic] = useState(''); // Tâm trương
    const [result, setResult] = useState(null);

    // 2. Hàm logic tra cứu phân loại huyết áp
    const handleCheck = () => {
        const sys = parseInt(systolic);
        const dia = parseInt(diastolic);

        if (!sys || !dia) {
            alert("Vui lòng nhập đầy đủ chỉ số Tâm thu và Tâm trương!");
            return;
        }

        let category = "";
        let color = "";

        if (sys < 120 && dia < 80) {
            category = "Huyết áp bình thường";
            color = "#2f855a"; // Xanh lá
        } else if ((sys >= 120 && sys <= 129) && dia < 80) {
            category = "Huyết áp cao (Tiền tăng huyết áp)";
            color = "#d69e2e"; // Vàng
        } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
            category = "Tăng huyết áp Giai đoạn 1";
            color = "#ed8936"; // Cam
        } else if (sys >= 140 || dia >= 90) {
            category = "Tăng huyết áp Giai đoạn 2";
            color = "#e53e3e"; // Đỏ
        }

        // Trường hợp khẩn cấp
        if (sys > 180 || dia > 120) {
            category = "CẤP CỨU CAO HUYẾT ÁP (Cần gặp bác sĩ ngay)";
            color = "#742a2a"; // Đỏ đậm
        }

        setResult({ category, color });
    };

    // 3. Hàm Đặt lại (Reset)
    const handleReset = () => {
        setSystolic('');
        setDiastolic('');
        setResult(null);
    };

    return (
        <HealthLayout>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, color: '#333', fontSize: '22px' }}>Huyết Áp</h2>
            </div>

            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <span style={{ fontSize: '20px' }}>❤️</span>
                    <strong style={{ marginLeft: '10px', fontSize: '18px' }}>Tra cứu chỉ số</strong>
                </div>

                <div style={styles.cardBody}>
                    <div style={styles.inputGrid}>
                        <div>
                            <label style={styles.label}>Tâm thu (mmHg)</label>
                            <div style={styles.inputWrapper}>
                                <input
                                    type="number"
                                    value={systolic}
                                    onChange={(e) => setSystolic(e.target.value)}
                                    placeholder="vd: 120"
                                    style={styles.input}
                                />
                                <span style={styles.unit}>mmHg</span>
                            </div>
                        </div>
                        <div>
                            <label style={styles.label}>Tâm trương (mmHg)</label>
                            <div style={styles.inputWrapper}>
                                <input
                                    type="number"
                                    value={diastolic}
                                    onChange={(e) => setDiastolic(e.target.value)}
                                    placeholder="vd: 80"
                                    style={styles.input}
                                />
                                <span style={styles.unit}>mmHg</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                        <button onClick={handleCheck} style={styles.btnPrimary}>Tra cứu</button>
                        <button onClick={handleReset} style={styles.btnSecondary}>Đặt lại</button>
                    </div>

                    {/* Hiển thị kết quả */}
                    {result && (
                        <div style={{
                            marginTop: '25px',
                            padding: '20px',
                            borderRadius: '8px',
                            backgroundColor: result.color + '15', // Màu nhạt
                            border: `1px solid ${result.color}`,
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '14px', color: '#666' }}>Tình trạng sức khỏe:</span>
                            <div style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: result.color,
                                marginTop: '5px'
                            }}>
                                {result.category}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </HealthLayout>
    );
};

const styles = {
    card: { border: '1px solid #edf2f7', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', backgroundColor: '#fff' },
    cardHeader: { backgroundColor: '#1250dc', color: 'white', padding: '15px 25px', display: 'flex', alignItems: 'center' },
    cardBody: { padding: '30px 25px' },
    inputGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
    label: { display: 'block', marginBottom: '10px', color: '#4a5568', fontSize: '14px', fontWeight: '500' },
    inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    input: { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' },
    unit: { position: 'absolute', right: '15px', color: '#a0aec0', fontSize: '13px' },
    btnPrimary: { flex: 2, backgroundColor: '#1250dc', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
    btnSecondary: { flex: 1, backgroundColor: '#f7fafc', color: '#4a5568', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};

export default BloodPressurePage;