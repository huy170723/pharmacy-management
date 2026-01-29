import React from 'react';

const Footer = () => {
    const footerStyles = {
        footer: {
            backgroundColor: 'white',
            padding: '60px 0 30px 0', // Tăng padding trên để thoáng hơn
            marginTop: '60px',
            borderTop: '4px solid #1250dc',
            width: '100%'
        },
        container: {
            maxWidth: '1200px', // Giới hạn chiều rộng để nội dung không bị tràn màn hình lớn
            margin: '0 auto', // Căn giữa toàn bộ footer
            padding: '0 20px'
        },
        footerGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '30px',
            marginBottom: '40px'
        },
        footerHead: {
            color: '#333',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textTransform: 'uppercase' // Viết hoa tiêu đề cho chuyên nghiệp
        },
        footerLink: {
            color: '#666',
            fontSize: '14px',
            marginBottom: '12px',
            cursor: 'pointer',
            transition: 'color 0.3s'
        },
        contactNumber: {
            color: '#1250dc',
            fontWeight: 'bold',
            fontSize: '20px',
            margin: '5px 0'
        },
        copyRight: {
            textAlign: 'center',
            color: '#999',
            fontSize: '13px',
            borderTop: '1px solid #eee',
            paddingTop: '20px'
        }
    };

    return (
        <footer style={footerStyles.footer}>
            <div style={footerStyles.container}>
                <div style={footerStyles.footerGrid}>
                    {/* CỘT 1: VỀ CHÚNG TÔI */}
                    <div>
                        <h4 style={footerStyles.footerHead}>VỀ CHÚNG TÔI</h4>
                        {['Giới thiệu', 'Hệ thống cửa hàng', 'Chính sách bảo mật', 'Liên hệ'].map(item => (
                            <p key={item} style={footerStyles.footerLink}>{item}</p>
                        ))}
                    </div>

                    {/* CỘT 2: DANH MỤC */}
                    <div>
                        <h4 style={footerStyles.footerHead}>DANH MỤC</h4>
                        {['Thực phẩm chức năng', 'Dược mỹ phẩm', 'Thuốc không kê đơn', 'Thiết bị y tế'].map(item => (
                            <p key={item} style={footerStyles.footerLink}>{item}</p>
                        ))}
                    </div>

                    {/* CỘT 3: HỖ TRỢ KHÁCH HÀNG */}
                    <div>
                        <h4 style={footerStyles.footerHead}>HỖ TRỢ</h4>
                        {['Hướng dẫn mua hàng', 'Chính sách đổi trả', 'Câu hỏi thường gặp'].map(item => (
                            <p key={item} style={footerStyles.footerLink}>{item}</p>
                        ))}
                    </div>

                    {/* CỘT 4: TỔNG ĐÀI */}
                    <div>
                        <h4 style={footerStyles.footerHead}>TỔNG ĐÀI (8:00-22:00)</h4>
                        <p style={{ fontSize: '14px', color: '#666' }}>Tư vấn mua hàng:</p>
                        <p style={footerStyles.contactNumber}>1800 6928</p>
                        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>Góp ý & Khiếu nại:</p>
                        <p style={{ ...footerStyles.contactNumber, fontSize: '18px' }}>1800 6929</p>
                    </div>
                </div>

                <div style={footerStyles.copyRight}>
                    <p>© 2026 Dự án của Nguyen Duc Huy - Lớp CCQ2311G</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;