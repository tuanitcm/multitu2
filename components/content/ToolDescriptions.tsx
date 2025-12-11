
import React from 'react';

// Helper for internal links
const Link = ({ href, children }: { href: string; children?: React.ReactNode }) => (
  <a href={href} className="text-blue-600 hover:underline font-medium cursor-pointer" data-internal-link>
    {children}
  </a>
);

export const getToolDetails = (id: string, title: string): React.ReactNode => {
  switch (id) {
    // =================================================================================================
    // NHÓM TOÁN HỌC (MATH)
    // =================================================================================================
    case 'percentage':
      return (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <h2>Tổng quan về Phần trăm (%)</h2>
          <p>
            Trong toán học, phần trăm là một tỷ số thể hiện dưới dạng phân số có mẫu số là 100. Ký hiệu thường dùng là "%". 
            Ví dụ, 20% tương đương với phân số 20/100 hay số thập phân 0.2. Khái niệm này xuất hiện trong mọi khía cạnh của đời sống hiện đại, 
            từ tính toán lãi suất ngân hàng, thuế VAT, giảm giá mua sắm cho đến các thống kê khoa học.
          </p>
          <p>
            Việc tính toán phần trăm đôi khi gây nhầm lẫn, đặc biệt là các bài toán ngược (tìm số gốc) hoặc tính phần trăm thay đổi. 
            Công cụ của chúng tôi được thiết kế để giải quyết 3 bài toán phổ biến nhất một cách chính xác tuyệt đối.
          </p>

          <h3>1. Tính giá trị phần trăm của một số</h3>
          <p><strong>Bài toán:</strong> Tìm X% của số Y.</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-center">
            Công thức: Giá trị = (X ÷ 100) × Y
          </div>
          <p>
            <em>Ví dụ thực tế:</em> Bạn đi ăn nhà hàng hết 500.000đ và muốn bo (tip) thêm 10%. Số tiền tip sẽ là:
            <br/>(10 ÷ 100) × 500.000 = 0.1 × 500.000 = <strong>50.000đ</strong>.
          </p>

          <h3>2. Tính tỷ lệ phần trăm giữa hai số</h3>
          <p><strong>Bài toán:</strong> Số A chiếm bao nhiêu phần trăm của số B?</p>
          <p>
            Đây là bài toán thường gặp khi tính điểm số hoặc thị phần. Nếu bạn muốn tính chi tiết hơn, hãy dùng <Link href="/ratio-percentage">Công cụ tính tỷ lệ phần trăm</Link>.
          </p>

          <h3>3. Ứng dụng trong Tài chính & Kinh doanh</h3>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>Tính thuế VAT:</strong> Tại Việt Nam, thuế GTGT thường là 8% hoặc 10%. Để tính giá sau thuế, bạn nhân giá gốc với 1.08 hoặc 1.1.
            </li>
            <li>
              <strong>Lãi suất ngân hàng:</strong> Lãi suất thường được niêm yết theo % năm. Để tính lãi thực nhận, bạn cần công thức phức tạp hơn, xem tại <Link href="/compound-interest">Tính lãi suất kép</Link>.
            </li>
            <li>
              <strong>Giảm giá (Discount):</strong> Công thức tính giá sau khi giảm là: <code>Giá gốc × (100% - %Giảm)</code>. Xem thêm tại <Link href="/discount-calculator">Tính giảm giá</Link>.
            </li>
          </ul>

          <h3>Các lỗi thường gặp khi tính phần trăm</h3>
          <p>
            Một sai lầm phổ biến là cộng dồn phần trăm. Ví dụ: Một cổ phiếu giảm 50%, sau đó tăng 50% không có nghĩa là nó trở về giá cũ.
            <br/>Ví dụ: Giá 100k giảm 50% còn 50k. Từ 50k tăng 50% chỉ lên được 75k. Bạn vẫn lỗ 25k. 
            Để tính toán chính xác sự biến động này, hãy dùng <Link href="/percentage-change">Công cụ tính phần trăm thay đổi</Link>.
          </p>
        </div>
      );

    case 'percent-change':
      return (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <h2>Tầm quan trọng của việc tính Tăng/Giảm phần trăm</h2>
          <p>
            Chỉ số phần trăm thay đổi (Percentage Change) là thước đo quan trọng nhất để đánh giá sự tăng trưởng hay suy thoái của một đại lượng theo thời gian. 
            Nó được sử dụng rộng rãi trong phân tích tài chính (giá cổ phiếu, doanh thu), kinh tế vĩ mô (lạm phát, GDP) và cả đời sống cá nhân (cân nặng, chi tiêu).
          </p>

          <h3>Công thức tính toán chuẩn</h3>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-center my-4">
            % Thay đổi = <span className="text-xl">(</span> (Giá trị Mới - Giá trị Cũ) ÷ |Giá trị Cũ| <span className="text-xl">)</span> × 100%
          </div>
          <p><strong>Lưu ý:</strong> Mẫu số luôn là giá trị tuyệt đối của giá trị cũ để đảm bảo dấu của kết quả phản ánh đúng hướng thay đổi (tăng hay giảm).</p>

          <h3>Phân tích kết quả</h3>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong>Kết quả Dương (+):</strong> Biểu thị sự tăng trưởng (Increase). Ví dụ: Doanh thu từ 100 lên 120 là tăng 20%.</li>
            <li><strong>Kết quả Âm (-):</strong> Biểu thị sự suy giảm (Decrease). Ví dụ: Cân nặng từ 80kg xuống 70kg là giảm 12.5%.</li>
          </ul>

          <h3>Ví dụ nâng cao: Tính toán lợi nhuận đầu tư</h3>
          <p>
            Giả sử bạn mua Vàng với giá 60 triệu/lượng (Giá cũ). Sau 1 năm, giá vàng lên 72 triệu/lượng (Giá mới).
            <br/>Mức tăng trưởng là: ((72 - 60) ÷ 60) × 100% = <strong>20%</strong>.
            <br/>Tuy nhiên, nếu tính cả lạm phát (ví dụ 4%), thì lợi nhuận thực tế của bạn thấp hơn.
          </p>
        </div>
      );

    // =================================================================================================
    // NHÓM VĂN BẢN (TEXT TOOLS)
    // =================================================================================================
    case 'word-counter':
      return (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <h2>Tại sao bạn cần một công cụ Đếm từ (Word Counter)?</h2>
          <p>
            Trong kỷ nguyên số, độ dài của văn bản quyết định hiệu quả truyền thông. "Content is King", nhưng content cần phải đúng định dạng và độ dài. 
            Công cụ đếm từ và ký tự của chúng tôi không chỉ đếm số lượng mà còn phân tích cấu trúc văn bản (câu, đoạn) giúp bạn tối ưu hóa nội dung.
          </p>

          <h3>Tiêu chuẩn độ dài cho các nền tảng phổ biến</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 border border-slate-200">Nền tảng / Mục đích</th>
                  <th className="p-3 border border-slate-200">Giới hạn / Khuyên dùng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200">Google SEO Title</td>
                  <td className="p-3 border border-slate-200">Dưới 60 ký tự (khoảng 500-600px)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">Meta Description</td>
                  <td className="p-3 border border-slate-200">150 - 160 ký tự</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">Bài đăng Facebook</td>
                  <td className="p-3 border border-slate-200">40 - 80 từ (tương tác tốt nhất)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">Twitter (X)</td>
                  <td className="p-3 border border-slate-200">Tối đa 280 ký tự</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">Blog Post chuẩn SEO</td>
                  <td className="p-3 border border-slate-200">1.500 - 2.500 từ (nội dung chuyên sâu)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Sự khác biệt giữa "Đếm từ" và "Đếm ký tự"</h3>
          <p>
            <strong>Đếm từ (Word count):</strong> Đếm số lượng các từ đơn lẻ. Ví dụ câu "Xin chào" có 2 từ. Thường dùng trong báo chí, dịch thuật, tiểu luận học thuật.
            <br/>
            <strong>Đếm ký tự (Character count):</strong> Đếm tổng số chữ cái, số, dấu câu và khoảng trắng. Ví dụ "Xin chào" có 8 ký tự (bao gồm khoảng trắng). Quan trọng cho SMS, Twitter, tiêu đề quảng cáo.
          </p>

          <h3>Mẹo viết nội dung hiệu quả</h3>
          <p>
            Sau khi kiểm tra độ dài, hãy chắc chắn văn bản của bạn dễ đọc. Nếu bạn cần chuyển đổi định dạng văn bản (ví dụ viết hoa tiêu đề), hãy sử dụng <Link href="/doi-kieu-chu">Công cụ đổi kiểu chữ</Link>. 
            Nếu bài viết cần thêm sinh động, đừng quên chèn biểu tượng cảm xúc từ <Link href="/icon-facebook">Kho Icon Facebook</Link>.
          </p>
        </div>
      );
    
    case 'number-to-word':
        return (
            <div className="space-y-6 text-slate-700 leading-relaxed">
                <h2>Chuyển đổi Số sang Chữ trong Tiếng Việt</h2>
                <p>
                    Việc đọc số thành chữ (Number to Text) là một nghiệp vụ bắt buộc trong kế toán, tài chính và hành chính văn phòng tại Việt Nam. 
                    Sai sót trong việc ghi số tiền bằng chữ trên hóa đơn, séc, hay hợp đồng có thể dẫn đến những rắc rối pháp lý nghiêm trọng hoặc bị từ chối thanh toán.
                </p>

                <h3>Các quy tắc đọc số chuẩn Tiếng Việt</h3>
                <p>Công cụ của chúng tôi tuân thủ chặt chẽ các quy tắc chính tả và ngữ pháp tiếng Việt hiện hành:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong>Linh vs Lẻ:</strong> Dùng "linh" hoặc "lẻ" cho số 0 ở giữa (ví dụ 105 đọc là "một trăm linh năm"). Miền Bắc thường dùng "linh", miền Nam dùng "lẻ".</li>
                    <li><strong>Mốt vs Một:</strong> Số 1 ở hàng đơn vị đọc là "mốt" khi hàng chục lớn hơn hoặc bằng 2 (21: hai mươi mốt). Đọc là "một" khi hàng chục là 0 hoặc 1 (11: mười một).</li>
                    <li><strong>Tư vs Bốn:</strong> Số 4 ở hàng đơn vị thường đọc là "tư" khi hàng chục lớn hơn hoặc bằng 2 (24: hai mươi tư).</li>
                    <li><strong>Lăm vs Năm:</strong> Số 5 ở hàng đơn vị đọc là "lăm" khi hàng chục lớn hơn 0 (15: mười lăm, 55: năm mươi lăm). Đọc là "năm" khi hàng chục là 0 (05: linh năm).</li>
                </ul>

                <h3>Ứng dụng thực tế</h3>
                <p>
                    Công cụ này cực kỳ hữu ích cho:
                    <br/>- <strong>Kế toán/Thủ quỹ:</strong> Viết phiếu thu, phiếu chi, ủy nhiệm chi.
                    <br/>- <strong>Nhân viên ngân hàng:</strong> Kiểm tra số tiền trên chứng từ.
                    <br/>- <strong>Lập trình viên:</strong> Tham khảo logic để xây dựng tính năng đọc số cho phần mềm (Xem thêm <Link href="/dev">Công cụ cho Dev</Link>).
                </p>
            </div>
        );

    // =================================================================================================
    // NHÓM SỨC KHỎE (HEALTH)
    // =================================================================================================
    case 'bmi':
      return (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <h2>Chỉ số BMI là gì? Tại sao nó quan trọng?</h2>
          <p>
            BMI (Body Mass Index) hay Chỉ số khối cơ thể là một công cụ sàng lọc phổ biến được Tổ chức Y tế Thế giới (WHO) sử dụng để đánh giá tình trạng dinh dưỡng của một người trưởng thành. 
            Nó giúp xác định xem bạn đang bị thiếu cân, thừa cân hay có cân nặng lý tưởng so với chiều cao của mình.
          </p>

          <h3>Công thức tính BMI chuẩn</h3>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 font-mono text-center text-emerald-800 my-4">
            BMI = Cân nặng (kg) / [Chiều cao (m)]²
          </div>

          <h3>Phân loại tình trạng cơ thể (Theo chuẩn WHO & IDI WPRO cho người châu Á)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 border border-slate-200">BMI (kg/m²)</th>
                  <th className="p-3 border border-slate-200">Phân loại</th>
                  <th className="p-3 border border-slate-200">Nguy cơ bệnh lý</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200">&lt; 18.5</td>
                  <td className="p-3 border border-slate-200 text-blue-600">Gầy (Thiếu cân)</td>
                  <td className="p-3 border border-slate-200">Thấp (nguy cơ loãng xương, suy nhược)</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">18.5 - 22.9</td>
                  <td className="p-3 border border-slate-200 text-emerald-600 font-bold">Bình thường</td>
                  <td className="p-3 border border-slate-200">Trung bình</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">23.0 - 24.9</td>
                  <td className="p-3 border border-slate-200 text-amber-600 font-bold">Thừa cân (Tiền béo phì)</td>
                  <td className="p-3 border border-slate-200">Tăng nhẹ</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">&ge; 25.0</td>
                  <td className="p-3 border border-slate-200 text-rose-600 font-bold">Béo phì (Độ I, II, III)</td>
                  <td className="p-3 border border-slate-200">Cao (Tim mạch, Tiểu đường, Khớp)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Hạn chế của BMI</h3>
          <p>
            Mặc dù phổ biến, BMI không phản ánh tỷ lệ mỡ và cơ. Ví dụ: Một vận động viên thể hình có thể có BMI cao (do cơ bắp nặng) nhưng không hề béo phì.
            Để đánh giá chính xác hơn về sức khỏe chuyển hóa, bạn nên kết hợp tính <Link href="/bmr-tdee">Chỉ số BMR & TDEE</Link> để biết lượng calo cần thiết mỗi ngày.
          </p>
        </div>
      );

    case 'bmr':
      return (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <h2>Hiểu đúng về BMR và TDEE</h2>
          <p>
            Để kiểm soát cân nặng (tăng, giảm hoặc giữ cân), nguyên tắc vàng là <strong>Cân bằng năng lượng (Calories In vs Calories Out)</strong>. 
            Hai chỉ số quan trọng nhất bạn cần biết là BMR và TDEE.
          </p>

          <h3>1. BMR (Basal Metabolic Rate) - Tỷ lệ trao đổi chất cơ bản</h3>
          <p>
            BMR là lượng năng lượng tối thiểu mà cơ thể bạn cần để duy trì các chức năng sống cơ bản (hô hấp, tuần hoàn máu, hoạt động não bộ, tái tạo tế bào...) trong trạng thái nghỉ ngơi hoàn toàn.
            Kể cả khi bạn ngủ cả ngày, cơ thể vẫn đốt cháy lượng calo này.
          </p>
          <p>
            Công cụ của chúng tôi sử dụng <strong>Công thức Mifflin-St Jeor</strong>, được Hiệp hội Dinh dưỡng Hoa Kỳ đánh giá là chính xác nhất hiện nay.
          </p>

          <h3>2. TDEE (Total Daily Energy Expenditure) - Tổng năng lượng tiêu thụ</h3>
          <p>
            TDEE là tổng lượng calo bạn đốt cháy trong 24 giờ, bao gồm BMR cộng với năng lượng cho mọi hoạt động thể chất (đi lại, làm việc, tập thể dục).
          </p>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 font-mono text-center text-orange-800 my-4">
            TDEE = BMR × Hệ số vận động (PAL)
          </div>

          <h3>Chiến lược ăn uống dựa trên TDEE</h3>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong>Giảm cân:</strong> Ăn thấp hơn TDEE khoảng 300-500 calo (Thâm hụt calo).</li>
            <li><strong>Tăng cân:</strong> Ăn cao hơn TDEE khoảng 300-500 calo (Dư thừa calo).</li>
            <li><strong>Giữ cân:</strong> Ăn bằng mức TDEE.</li>
          </ul>
          <p>
            Hãy nhớ uống đủ nước để hỗ trợ quá trình trao đổi chất. Kiểm tra tại <Link href="/water-calculator">Công cụ tính nước uống</Link>.
          </p>
        </div>
      );

    // =================================================================================================
    // NHÓM BẢO MẬT & DEV (SECURITY & DEV)
    // =================================================================================================
    case 'password':
      return (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <h2>Tại sao bạn cần một Trình tạo mật khẩu ngẫu nhiên?</h2>
          <p>
            Trong kỷ nguyên số, "Mật khẩu" là chìa khóa bảo vệ tài sản, danh tính và dữ liệu cá nhân của bạn. Tuy nhiên, con người thường có xu hướng chọn những mật khẩu dễ nhớ (như ngày sinh, tên thú cưng, 123456...), 
            điều này tạo ra lỗ hổng bảo mật cực lớn. Hacker sử dụng các công cụ tự động (Brute-force, Dictionary Attack) có thể đoán ra các mật khẩu này trong tích tắc.
          </p>

          <h3>Entropy: Thước đo độ mạnh mật khẩu</h3>
          <p>
            Độ mạnh của mật khẩu được đo bằng "Entropy" (độ hỗn loạn). Mật khẩu càng dài và càng ngẫu nhiên thì Entropy càng cao, càng khó bị bẻ khóa.
            Công cụ của chúng tôi giúp bạn tạo ra các chuỗi ký tự có độ Entropy cao nhất có thể.
          </p>

          <h3>Các tính năng an toàn của công cụ này</h3>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li><strong>Client-side Generation:</strong> Mật khẩu được tạo ngay trên trình duyệt của bạn bằng Javascript. Không có dữ liệu nào được gửi về máy chủ của chúng tôi. Tuyệt đối an toàn.</li>
            <li><strong>Tùy chỉnh đa dạng:</strong> Bạn có thể chọn độ dài, bao gồm ký tự đặc biệt, số, chữ hoa/thường tùy theo yêu cầu của trang web bạn đăng ký.</li>
            <li><strong>Không lưu trữ:</strong> Vì không có database, chúng tôi không thể lưu mật khẩu của bạn. Hãy nhớ copy và lưu nó vào Trình quản lý mật khẩu (Password Manager).</li>
          </ul>

          <h3>Lời khuyên bảo mật từ chuyên gia</h3>
          <p>
            1. Không bao giờ dùng chung một mật khẩu cho nhiều tài khoản (đặc biệt là Email và Ngân hàng).<br/>
            2. Bật xác thực 2 bước (2FA) bất cứ khi nào có thể.<br/>
            3. Thay đổi mật khẩu định kỳ 3-6 tháng.
          </p>
        </div>
      );
    
    case 'facebook-icons':
        return (
            <div className="space-y-6 text-slate-700 leading-relaxed">
                <h2>Kho Icon Facebook & Emoji khổng lồ 2024</h2>
                <p>
                    Bạn có biết các bài viết trên Facebook có sử dụng Emoji (biểu tượng cảm xúc) có tỷ lệ tương tác (Like, Share, Comment) cao hơn <strong>57%</strong> so với bài viết chỉ toàn chữ? 
                    Emoji giúp truyền tải cảm xúc, ngắt nhịp văn bản và làm nổi bật các ý quan trọng.
                </p>

                <h3>Cách sử dụng công cụ này</h3>
                <p>
                    Chúng tôi đã tổng hợp hơn 1000 icon facebook, ký tự đặc biệt phổ biến nhất và phân loại chúng để bạn dễ dàng tìm kiếm:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                    <li><strong>Tìm kiếm hoặc Duyệt:</strong> Lướt qua các danh mục như "Cảm xúc", "Đồ ăn", "Du lịch" hoặc dùng thanh tìm kiếm.</li>
                    <li><strong>Chọn Icon:</strong> Click vào icon bạn thích, nó sẽ tự động nhảy vào ô soạn thảo phía trên. Bạn có thể chọn nhiều icon cùng lúc để ghép thành câu chuyện.</li>
                    <li><strong>Sao chép:</strong> Nhấn nút "Copy" và dán (Paste) vào bài đăng Facebook, Zalo, Instagram, TikTok hoặc tin nhắn.</li>
                </ol>

                <h3>Icon có bị lỗi ô vuông không?</h3>
                <p>
                    Tất cả icon ở đây đều chuẩn <strong>Unicode</strong> quốc tế. Điều này nghĩa là chúng hiển thị tốt trên mọi thiết bị (iPhone, Android, Windows, Mac). 
                    Nếu bạn thấy ô vuông trên máy tính cũ, đừng lo, người xem trên điện thoại vẫn sẽ thấy icon đẹp lung linh.
                </p>
                <p>
                    Ngoài icon, nếu bạn cần làm đẹp văn bản (viết chữ in đậm, in nghiêng, gạch chân), hãy tham khảo <Link href="/doi-kieu-chu">Công cụ đổi kiểu chữ</Link>.
                </p>
            </div>
        );

    // =================================================================================================
    // CÁC TOOL KHÁC (MẶC ĐỊNH CẤU TRÚC CHUẨN)
    // =================================================================================================
    default:
      return (
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <h2>Giới thiệu về công cụ {title}</h2>
          <p>
            Chào mừng bạn đến với <strong>{title}</strong> - một trong những tiện ích trực tuyến miễn phí thuộc hệ sinh thái MultiTools. 
            Chúng tôi phát triển công cụ này nhằm giúp bạn giải quyết các vấn đề tính toán, chuyển đổi hoặc xử lý dữ liệu một cách nhanh chóng, chính xác mà không cần cài đặt phần mềm phức tạp.
          </p>

          <h3>Tại sao nên sử dụng công cụ này?</h3>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-blue-600 mb-1">Tốc độ & Tiện lợi</h4>
                <p className="text-sm">Không cần chờ tải, không cần đăng nhập. Kết quả hiển thị tức thì (Real-time) ngay khi bạn nhập dữ liệu.</p>
            </div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-emerald-600 mb-1">Chính xác tuyệt đối</h4>
                <p className="text-sm">Thuật toán được xây dựng dựa trên các công thức chuẩn (Toán học, Vật lý, Tiêu chuẩn quốc tế ISO).</p>
            </div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-purple-600 mb-1">Giao diện thân thiện</h4>
                <p className="text-sm">Thiết kế tối ưu cho trải nghiệm người dùng (UX), dễ dàng thao tác trên cả điện thoại và máy tính.</p>
            </div>
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-orange-600 mb-1">Bảo mật dữ liệu</h4>
                <p className="text-sm">Hầu hết các công cụ xử lý dữ liệu trực tiếp trên trình duyệt (Client-side), đảm bảo tính riêng tư.</p>
            </div>
          </div>

          <h3>Hướng dẫn sử dụng</h3>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>Nhập các thông số yêu cầu vào các ô trống.</li>
            <li>Chọn đơn vị hoặc chế độ tính toán phù hợp (nếu có).</li>
            <li>Kết quả sẽ tự động xuất hiện hoặc sau khi bạn nhấn nút tính toán.</li>
            <li>Sử dụng nút "Sao chép" hoặc "Chia sẻ" để lưu lại kết quả.</li>
          </ol>

          <h3>Khám phá thêm</h3>
          <p>
            MultiTools cung cấp hàng trăm công cụ khác nhau. Nếu bạn thấy công cụ này hữu ích, có thể bạn cũng sẽ quan tâm đến các công cụ khác trong cùng danh mục. 
            Hãy truy cập <Link href="/">Trang chủ</Link> hoặc sử dụng thanh tìm kiếm để khám phá thêm.
          </p>
        </div>
      );
  }
};
