import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetailPage = () => {
    const { id } = useParams();

    // Tự động cuộn lên đầu trang khi mở bài viết mới
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const blogData = {
        "1": {
            title: "Pharmacy phối hợp STADA Pymepharco lan toả kiến thức y khoa về phòng tránh thừa cân, béo phì",
            tag: "Truyền thông",
            date: "28/01/2026",
            img: "https://cdn.nhathuoclongchau.com.vn/unsafe/835x470/filters:format(webp)/PAP_05829_e4106ae0fc.jpg",
            content: `
                Thông qua hợp tác đào tạo và truyền thông, Pharmacy và STADA đã vận dụng kiến thức y khoa quốc tế vào thực hành tại Việt Nam, góp phần đẩy lùi vấn nạn sức khỏe này. Đây là bước đi đánh dấu cột mốc quan trọng trong mối quan hệ hợp tác chiến lược, toàn diện và bền vững giữa hệ thống nhà thuốc Pharmacy và STADA Pymepharco (thuộc tập đoàn dược phẩm hàng đầu Đức STADA).

                 Thực trạng đáng báo động về béo phì
                Theo thống kê của Tổ chức Y tế Thế giới (WHO), khoảng 16% người lớn từ 18 tuổi trở lên trên toàn thế giới bị béo phì vào năm 2022. Tại Việt Nam, khoảng 25% người trưởng thành hiện đang bị thừa cân hoặc béo phì. Đáng chú ý, tỷ lệ này ở trẻ em lứa tuổi học đường (5 - 19 tuổi) năm 2020 đã tăng gấp đôi so với năm 2010.

                Thừa cân béo phì không chỉ ảnh hưởng đến thẩm mỹ mà còn là nguyên nhân dẫn đến nhiều bệnh nguy hiểm như:
                - Biến chứng về cơ xương khớp.
                - Rối loạn thần kinh.
                - Tiểu đường type 2.
                - Bệnh tim mạch và ung thư.

                 Chương trình "Giảm cân an toàn bắt đầu từ hiểu biết đúng"
                Trong khuôn khổ sự kiện, Pharmacy và STADA Pymepharco tổ chức chương trình đo và đánh giá chỉ số BMI, huyết áp, điện tim và tư vấn cá nhân hóa. Qua đó, người dân được các chuyên gia y tế phân tích kỹ lưỡng về chỉ số cơ thể, giúp kịp thời nhận biết nguy cơ sức khỏe.

                Đội ngũ y khoa nhấn mạnh việc giảm cân cần hiểu biết đúng, tuân theo tư vấn của bác sĩ và tích cực xây dựng lối sống lành mạnh. Song song đó, các buổi đào tạo y khoa chuyên sâu cũng được triển khai nhằm nâng cao năng lực tư vấn và thực hành dược lâm sàng cho đội ngũ nhân viên y tế tại hệ thống.

                 Về STADA Pymepharco
                Thành lập năm 1989 và là thành viên của Tập đoàn STADA (Đức) từ năm 2021, công ty sở hữu 2 nhà máy đạt chuẩn EU-GMP với danh mục hơn 400 sản phẩm chăm sóc sức khỏe chất lượng quốc tế, được tin dùng tại hơn 14.000 bệnh viện và nhà thuốc trên toàn quốc.
            `
        },
        "2": {
            title: "Pharmacy đóng góp sáng kiến về y tế số tại Diễn đàn Kinh tế Thụy Sĩ – Việt Nam 2025",
            tag: "Tin tức",
            date: "25/01/2026",
            img: "https://cdn.nhathuoclongchau.com.vn/unsafe/228x129/filters:format(webp)/img9763_1762309914009601793386_1762310125225_17623101258241322932016_e90feeffd6.jpg",
            content: `
                Diễn đàn Kinh tế Thụy Sĩ - Việt Nam 2025 (SVEF 2025) lần đầu tiên diễn ra tại Đà Nẵng, thu hút gần 400 đại biểu trong nước và quốc tế. Với chủ đề "Quan hệ đối tác đổi mới vì tăng trưởng bền vững", sự kiện là đòn bẩy thúc đẩy hợp tác đổi mới sáng tạo giữa Việt Nam và Thụy Sĩ.

                Tại phiên thảo luận chuyên sâu về "Dược phẩm & Đổi mới Y tế", đại diện hệ thống Pharmacy đã chia sẻ những kinh nghiệm thực tiễn quý báu trong việc ứng dụng công nghệ vào hành trình chăm sóc sức khỏe toàn dân.

                 Chiến lược ứng dụng trí tuệ nhân tạo (AI) cá nhân hóa
                Với quy mô 2.400 nhà thuốc và hơn 200 trung tâm tiêm chủng, phục vụ 1/3 dân số cả nước, Pharmacy khẳng định công nghệ chính là nền tảng cốt lõi để phát triển bền vững. AI giúp hệ thống phân tích, thấu hiểu và xây dựng hồ sơ sức khỏe cá nhân hóa cho từng khách hàng, từ đó mang đến giải pháp chăm sóc phù hợp và kịp thời nhất.

                Đại diện Pharmacy chia sẻ: "AI là cầu nối giúp dược sĩ tư vấn kịp thời hơn, người dân nhận diện nguy cơ bệnh tốt hơn, và tuân thủ điều trị hiệu quả hơn. Chúng tôi đặt con người làm trung tâm; AI không thay thế dược sĩ mà đóng vai trò là người đồng hành hỗ trợ."

                 Công nghệ nâng tầm trình độ đội ngũ y tế
                Bên cạnh việc phục vụ khách hàng, AI còn được áp dụng mạnh mẽ trong công tác đào tạo nội bộ. Giáo trình học của các dược sĩ tại Pharmacy đều được cá nhân hóa bởi AI, giúp họ nắm vững kiến thức chuyên môn và nâng cao trình độ nghiệp vụ, mang lại trải nghiệm tin cậy cho người dân.

                Sự cởi mở của người Việt với công nghệ, kể cả những khách hàng lớn tuổi, là động lực để Pharmacy phát huy vai trò "cánh tay nối dài" của ngành Y tế, mang kiến thức y khoa chuẩn mực đến gần hơn với cộng đồng.
            `
        },
        "3": {
            title: "Pharmacy cùng Abbott – tập đoàn chăm sóc sức khỏe hàng đầu thế giới triển khai hợp tác chiến lược",
            tag: "Truyền thông",
            date: "30/01/2026",
            img: "https://cdn.nhathuoclongchau.com.vn/unsafe/228x129/filters:format(webp)/photo_2025_11_05_13_47_30_2_c90020df61.jpg",
            content: `
                Với chủ đề “Nâng cao chăm sóc sức khỏe Việt Nam”, hệ thống Pharmacy và tập đoàn Abbott đã chính thức công bố những trụ cột hợp tác chiến lược, thể hiện cam kết đồng hành bền vững vì sức khỏe cộng đồng. Buổi lễ có sự tham dự của các lãnh đạo cấp cao từ Abbott khu vực Châu Á Thái Bình Dương và ban điều hành Pharmacy.

                 Mục tiêu nâng tầm chất lượng y tế Việt Nam
                Thông qua hợp tác này, hai đơn vị hướng đến việc thúc đẩy ứng dụng y tế từ xa (telemedicine), chia sẻ thông tin khoa học và đào tạo chuyên sâu nhằm tăng cường năng lực cho đội ngũ nhân viên y tế. Sáng kiến này tập trung vào các lĩnh vực trọng điểm như tim mạch, sức khỏe phụ nữ, quản lý đái tháo đường và phòng ngừa cúm.

                Đại diện Abbott, ông Karim Elmashad chia sẻ: “Abbott tự hào được đồng hành cùng các đối tác chiến lược để cùng xây dựng một tương lai khỏe mạnh hơn cho Việt Nam”.

                 Cam kết hành động vì sức khỏe cộng đồng
                Đại diện Pharmacy nhấn mạnh rằng sức mạnh của hệ thống y tế không chỉ nằm ở quy mô mà còn ở khả năng giáo dục và xây dựng niềm tin. Với mạng lưới hơn 2.400 nhà thuốc và 200 trung tâm tiêm chủng, Pharmacy cam kết tiếp tục đầu tư vào đào tạo, thúc đẩy ý thức phòng bệnh và chăm sóc sức khỏe chủ động.

                 Hợp tác mở rộng cùng Domesco
                Bên cạnh Abbott, Pharmacy cũng đã ký kết hợp tác chiến lược với công ty Domesco nhằm triển khai chuỗi đào tạo y khoa chuyên sâu và tối ưu chuỗi cung ứng. Sự kết nối này giúp đảm bảo nguồn thuốc ổn định và mở rộng danh mục thực phẩm chức năng, giúp người bệnh tuân thủ điều trị hiệu quả và bền vững.
            `
        },
        "4": {
            title: "Hợp tác Lịch sử: Bộ Y tế, Pharmacy, Bayer 'bắt tay' triển khai chiến lược quốc gia về phòng, quản lý đột quỵ",
            tag: "Truyền thông",
            date: "29/10/2025",
            img: "https://cdn.nhathuoclongchau.com.vn/unsafe/228x129/filters:format(webp)/photo_2025_11_05_13_47_30_2_c90020df61.jpg",
            content: `
                Sự kiện khởi động chương trình "Hợp tác chiến lược Quốc gia về phòng và quản lý đột quỵ tại Việt Nam" đã diễn ra tại Hà Nội với sự phối hợp của Bộ Y tế, Hội Thầy thuốc trẻ Việt Nam, hệ thống Pharmacy và công ty Bayer Việt Nam. Đây là một bước tiến quan trọng hướng tới việc giảm thiểu gánh nặng bệnh tật và tử vong do đột quỵ gây ra.

                 Thực trạng đột quỵ tại Việt Nam
                Đột quỵ hiện là một trong những nguyên nhân hàng đầu gây tử vong và tàn phế tại Việt Nam. Theo số liệu của WHO năm 2021, nước ta ghi nhận hơn 167 ca tử vong do đột quỵ trên mỗi 100.000 người. Đáng lo ngại hơn, xu hướng trẻ hóa trong các ca đột quỵ đang gia tăng, tạo ra gánh nặng kinh tế lớn cho xã hội.

                 Tầm nhìn chiến lược đến năm 2035
                Dưới sự chỉ đạo của Bộ Y tế, chương trình sẽ triển khai qua 3 giai đoạn với tầm nhìn dài hạn đến năm 2035. Hoạt động tập trung vào việc giáo dục nhận thức cộng đồng và ứng dụng công nghệ trong y tế dự phòng. 

                Thứ trưởng Bộ Y tế Trần Văn Thuấn nhấn mạnh: “Việc đưa thông tin tuyên truyền và phòng ngừa đột quỵ đến từng người dân thông qua hệ thống hơn 2.400 nhà thuốc và 200 trung tâm tiêm chủng Pharmacy trên toàn quốc là một sáng kiến đột phá”.

                 Ứng dụng AI trong tầm soát đột quỵ miễn phí
                Điểm nhấn của sự kiện là chương trình tầm soát nguy cơ đột quỵ cho 1.000 người dân thông qua việc ứng dụng trí tuệ nhân tạo (AI). Công nghệ AI giúp phân tích dữ liệu sàng lọc nhanh chóng, đưa ra khuyến nghị cá nhân hóa và xây dựng bản đồ nguy cơ đột quỵ tại cộng đồng. 

                Đại diện Pharmacy, Bà Nguyễn Bạch Điệp chia sẻ: “Pharmacy cam kết hợp lực cùng các cơ quan y tế và đối tác chiến lược để triển khai loạt chương trình giúp dự phòng, nâng cao nhận thức sức khỏe, góp phần vì một Việt Nam khỏe mạnh hơn”.

                 Hợp tác đa diện cùng Bayer
                Bên cạnh mục tiêu phòng chống đột quỵ, Pharmacy và Bayer cũng ký kết hợp tác mở rộng sang các lĩnh vực thiết yếu khác như chăm sóc sức khỏe phụ nữ, quản lý bệnh lý mãn tính về tim mạch và ung thư đường tiêu hóa. Thông qua mạng lưới nhà thuốc rộng khắp, hai bên cam kết giúp người dân dễ dàng tiếp cận các giải pháp y tế chất lượng cao ngay tại cộng đồng.
            `
        },
        "5": {
            title: "Pharmacy và Bayer Việt Nam: Cộng hưởng sức mạnh, hợp lực nâng cao chất lượng chăm sóc người Việt",
            tag: "Truyền thông",
            date: "25/10/2025",
            img: "https://cdn.nhathuoclongchau.com.vn/unsafe/228x129/filters:format(webp)/HV_107789_6ff20e3c0b.JPG",
            content: `
                Ngày 24/10, tại TP.HCM, hệ thống Pharmacy và Bayer Việt Nam đã chính thức ký kết Biên bản ghi nhớ hợp tác chiến lược giai đoạn 2025–2027. Sự kiện đánh dấu bước tiến quan trọng trong nỗ lực chung nhằm xây dựng hệ sinh thái chăm sóc sức khỏe toàn diện, bền vững và lấy người dân làm trung tâm.

                 5 Trụ cột hợp tác chiến lược
                Thông qua việc phát huy thế mạnh và ứng dụng công nghệ số từ hai đơn vị, chương trình tập trung vào các mục tiêu:
                1. Phát triển các giải pháp y tế đổi mới nhằm nâng cao chất lượng cuộc sống.
                2. Tổ chức giáo dục sức khỏe cộng đồng qua nền tảng số và hệ thống nhà thuốc.
                3. Đào tạo chuyên sâu, nâng cao năng lực cho đội ngũ dược sĩ.
                4. Nâng cao trải nghiệm, giúp bệnh nhân tiếp cận dễ dàng với các liệu pháp điều trị tiên tiến.
                5. Đảm bảo nguồn cung ứng thuốc chất lượng cao, đạt chuẩn quốc tế.

                 Trọng tâm: Sức khỏe Phụ nữ và Tim mạch
                Hợp tác đặc biệt chú trọng vào hai lĩnh vực thiết yếu là sức khỏe Phụ nữ và sức khỏe Tim mạch. Việc chăm sóc tim mạch hiệu quả được xem là biện pháp then chốt để dự phòng nguy cơ đột quỵ và các biến cố nghiêm trọng khác. Hai đơn vị cam kết tối ưu hóa hệ thống phân phối để đảm bảo nguồn cung ổn định các sản phẩm chất lượng Đức đến tay người tiêu dùng Việt.

                 Tầm nhìn "Vì một Việt Nam khỏe mạnh hơn"
                Với lợi thế từ năng lực khoa học toàn cầu của Bayer cùng mạng lưới hơn 2.400 nhà thuốc và 200 trung tâm tiêm chủng của Pharmacy, sự hợp tác này kỳ vọng sẽ giúp giảm bớt gánh nặng bệnh tật trong cộng đồng. 

                Đại diện Pharmacy khẳng định: "Chúng tôi kiên định với mục tiêu mang đến dịch vụ y tế minh bạch, an toàn và giúp người dân dễ dàng tiếp cận sản phẩm chính hãng với giá tốt nhất". Sự kiện mở ra tiền đề cho nhiều hoạt động nâng cao chất lượng sống toàn diện cho người Việt trong tương lai.
            `
        },
    };

    const post = blogData[id] || blogData["1"];

    return (
        <div style={styles.pageBackground}>
            <div style={styles.articleContainer}>
                {/* Breadcrumb bóp hẹp theo bài viết */}
                <nav style={styles.breadcrumb}>
                    Trang chủ / Góc sức khỏe / Chi tiết bài viết
                </nav>

                {/* Thông tin đầu bài */}
                <div style={styles.metaInfo}>
                    <span style={styles.tag}>{post.tag}</span>
                    <span style={styles.date}>{post.date}</span>
                </div>

                <h1 style={styles.mainTitle}>{post.title}</h1>

                {/* Ảnh banner bài viết */}
                <div style={styles.imageWrapper}>
                    <img src={post.img} alt="banner" style={styles.bannerImg} />
                </div>

                {/* Nội dung chính */}
                <article style={styles.contentBody}>
                    {post.content}
                </article>

                {/* Chân bài viết */}
                <div style={styles.footerInfo}>
                    <p><strong>Nguồn:</strong> Pharmacy Tổng hợp</p>
                    <div style={styles.shareButtons}>
                        <span>Chia sẻ:</span>
                        <button style={styles.socialIcon}>FB</button>
                        <button style={styles.socialIcon}>ZL</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageBackground: {
        backgroundColor: '#f4f7fe', // Màu nền nhạt phía ngoài
        minHeight: '100vh',
        padding: '20px 0'
    },
    articleContainer: {
        maxWidth: '850px',       // Bóp hẹp lại ở mức 850px để cực kỳ dễ đọc
        margin: '0 auto',        // Căn giữa màn hình
        backgroundColor: '#fff', // Nền bài viết màu trắng
        padding: '40px 60px',    // Padding bên trong khung trắng
        borderRadius: '16px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
    },
    breadcrumb: {
        marginBottom: '25px',
        color: '#777',
        fontSize: '14px'
    },
    metaInfo: {
        display: 'flex',
        gap: '15px',
        marginBottom: '10px',
        alignItems: 'center'
    },
    tag: {
        backgroundColor: '#eef2ff',
        color: '#1250dc',
        fontWeight: 'bold',
        fontSize: '12px',
        padding: '4px 12px',
        borderRadius: '20px',
        textTransform: 'uppercase'
    },
    date: {
        color: '#999',
        fontSize: '14px'
    },
    mainTitle: {
        fontSize: '32px',
        color: '#1d1d1f',
        marginBottom: '30px',
        lineHeight: '1.3',
        fontWeight: '800'
    },
    imageWrapper: {
        margin: '0 -20px 30px -20px' // Để ảnh hơi tràn ra nhẹ tạo điểm nhấn
    },
    bannerImg: {
        width: '100%',
        borderRadius: '12px',
        display: 'block'
    },
    contentBody: {
        lineHeight: '1.9',      // Tăng khoảng cách dòng để chữ không bị dính vào nhau
        color: '#333',
        fontSize: '18px',
        whiteSpace: 'pre-line',
        textAlign: 'justify'    // Căn đều 2 bên như trang báo
    },
    footerInfo: {
        marginTop: '50px',
        paddingTop: '30px',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#777'
    },
    shareButtons: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    socialIcon: {
        border: '1px solid #ddd',
        borderRadius: '50%',
        width: '35px',
        height: '35px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold'
    }
};

export default BlogDetailPage;