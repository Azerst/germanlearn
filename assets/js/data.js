/* =========================================================
   Static Content — Từ vựng + Ngữ pháp + Từ điển + Động từ
   ========================================================= */
window.TOPIC_ICONS = {
  'Gia đình': '👨‍👩‍👧', 'Trường học': '🎓', 'Công việc': '💼', 'Mua sắm': '🛒',
  'Du lịch': '✈️', 'Sức khỏe': '🏥', 'Thực phẩm': '🍎', 'Nhà cửa': '🏠',
  'Quần áo': '👕', 'Thời gian': '⏰'
};

window.VOCAB = {
  'Gia đình': [
    { de: 'die Familie', vi: 'gia đình', ipa: '[faˈmiːli̯ə]', ex: 'Meine Familie ist groß.', exVi: 'Gia đình tôi đông.' },
    { de: 'der Vater', vi: 'bố', ipa: '[ˈfaːtɐ]', ex: 'Mein Vater ist Arzt.', exVi: 'Bố tôi là bác sĩ.' },
    { de: 'die Mutter', vi: 'mẹ', ipa: '[ˈmʊtɐ]', ex: 'Meine Mutter kocht gut.', exVi: 'Mẹ tôi nấu ăn giỏi.' }
  ]
};

window.GRAMMAR = {
  prasens: {
    title: 'Präsens — Thì hiện tại', level: 'A1',
    content: `<p>Thì hiện tại dùng diễn tả hành động đang xảy ra, thói quen, sự thật hiển nhiên.</p>
      <div class="example"><div class="de">lernen</div><div class="vi">ich lerne — du lernst — er/sie/es lernt — wir lernen — ihr lernt — sie lernen</div></div>`
  }
};

/* ========== DỮ LIỆU TỪ ĐIỂN TỪ FILE HTML ========== */
const W_RAW = `der Abend|buổi tối|A1|/ˈaː.bənt/
aber|nhưng|A1|/ˈaː.bɐ/
abfahren|khởi hành|A1|/ˈap.faː.ʁən/
die Adresse|địa chỉ|A1|/aˈdʁɛ.sə/
der Apfel|quả táo|A1|/ˈap.fəl/
arbeiten|làm việc|A1|/ˈaʁ.baɪ.tən/
der Arm|cánh tay|A1|/aʁm/
der Arzt|bác sĩ|A1|/aːɐ̯t͡st/
auch|cũng|A1|/aʊ̯x/
auf Wiedersehen|tạm biệt|A1|/aʊ̯f ˈviː.dɐ.zeː.ən/
das Auge|mắt|A1|/ˈaʊ̯.ɡə/
aussehen|trông có vẻ|A1|/ˈaʊ̯s.zeː.ən/
aussteigen|xuống xe|A1|/ˈaʊ̯s.ʃtaɪ̯.ɡən/
das Auto|ô tô|A1|/ˈaʊ̯.to/
die Bäckerei|tiệm bánh mì|A1|/bɛ.kəˈʁaɪ̯/
das Bad|phòng tắm|A1|/baːt/
die Banane|quả chuối|A1|/baˈnaː.nə/
der Bauch|bụng|A1|/baʊ̯x/
der Baum|cái cây|A1|/baʊ̯m/
beginnen|bắt đầu|A1|/bəˈɡɪ.nən/
beißen|cắn|A1|/ˈbaɪ̯.sən/
bekommen|nhận được|A1|/bəˈkɔ.mən/
benutzen|sử dụng|A1|/bəˈnʊ.t͡sən/
der Berg|núi|A1|/bɛʁk/
berufstätig|đang đi làm|A1|/bəˈʁuːfs.tɛː.tɪç/
beschreiben|miêu tả|A1|/bəˈʃʁaɪ̯.bən/
bestellen|gọi món|A1|/bəˈʃtɛ.lən/
besuchen|thăm|A1|/bəˈzuː.xən/
das Bett|cái giường|A1|/bɛt/
bezahlen|thanh toán|A1|/bəˈt͡saː.lən/
das Bier|bia|A1|/biːɐ̯/
das Bild|bức tranh|A1|/bɪlt/
billig|rẻ|A1|/ˈbɪ.lɪç/
die Birne|quả lê|A1|/ˈbɪʁ.nə/
bis|đến|A1|/bɪs/
bitte|làm ơn|A1|/ˈbɪ.tə/
blau|xanh dương|A1|/blaʊ̯/
bleiben|ở lại|A1|/ˈblaɪ̯.bən/
der Bleistift|bút chì|A1|/ˈblaɪ̯.ʃtɪft/
die Blume|bông hoa|A1|/ˈbluː.mə/
brauchen|cần|A1|/ˈbʁaʊ̯.xən/
braun|nâu|A1|/bʁaʊ̯n/
breit|rộng|A1|/bʁaɪ̯t/
bringen|mang đến|A1|/ˈbʁɪ.ŋən/
das Brot|bánh mì|A1|/bʁoːt/
das Brötchen|bánh mì nhỏ|A1|/ˈbʁøːt.çən/
der Bruder|anh/em trai|A1|/ˈbʁuː.dɐ/
das Buch|quyển sách|A1|/buːx/
der Bus|xe buýt|A1|/bʊs/
die Butter|bơ|A1|/ˈbʊ.tɐ/
das Café|quán cà phê|A1|/kaˈfeː/
der Chef|sếp|A1|/ʃɛf/
der Computer|máy tính|A1|/kɔmˈpjuː.tɐ/
danke|cảm ơn|A1|/ˈdaŋ.kə/
dann|sau đó|A1|/dan/
das|đó|A1|/das/
dauern|kéo dài|A1|/ˈdaʊ̯.ɐn/
dein|của bạn|A1|/daɪ̯n/
denken|nghĩ|A1|/ˈdɛŋ.kən/
denn|vì|A1|/dɛn/
der|đó|A1|/deːɐ̯/
deutsch|tiếng Đức|A1|/dɔʏ̯t͡ʃ/
dich|bạn|A1|/dɪç/
die|đó|A1|/diː/
dieser|này|A1|/ˈdiː.zɐ/
dir|bạn|A1|/diːɐ̯/
doch|có chứ|A1|/dɔx/
dort|ở đó|A1|/dɔʁt/
die Dusche|vòi sen|A1|/ˈduː.ʃə/
du|bạn|A1|/duː/
dunkel|tối|A1|/ˈdʊŋ.kəl/
dünn|mỏng|A1|/dʏn/
durch|qua|A1|/dʊʁç/
dürfen|được phép|A1|/ˈdʏʁ.fən/
sich duschen|tắm|A1|/ˈdʊ.ʃən/
die Ecke|góc phố|A1|/ˈɛ.kə/
das Ei|quả trứng|A1|/aɪ̯/
einfach|dễ|A1|/ˈaɪ̯n.fax/
einige|một số|A1|/ˈaɪ̯.nɪ.ɡə/
einkaufen|đi mua sắm|A1|/ˈaɪ̯n.kaʊ̯.fən/
einladen|mời|A1|/ˈaɪ̯n.laː.dən/
einsteigen|lên xe|A1|/ˈaɪ̯n.ʃtaɪ̯.ɡən/
der Elefant|con voi|A1|/e.leˈfant/
die Eltern|bố mẹ|A1|/ˈɛl.tɐn/
empfehlen|giới thiệu|A1|/ɛmˈpfeː.lən/
enden|kết thúc|A1|/ˈɛn.dən/
eng|chật|A1|/ɛŋ/
die Entschuldigung|lời xin lỗi|A1|/ɛntˈʃʊl.dɪ.ɡʊŋ/
er|anh ấy|A1|/eːɐ̯/
essen|ăn|A1|/ˈɛ.sən/
das Essen|đồ ăn|A1|/ˈɛ.sən/
euer|của các bạn|A1|/ˈɔʏ̯.ɐ/
fahren|đi (bằng xe)|A1|/ˈfaː.ʁən/
das Fahrrad|xe đạp|A1|/ˈfaːɐ̯.ʁaːt/
fallen|ngã, rơi|A1|/ˈfa.lən/
falsch|sai|A1|/falʃ/
die Familie|gia đình|A1|/faˈmiː.li̯ə/
fangen|bắt|A1|/ˈfa.ŋən/
die Farbe|màu sắc|A1|/ˈfaʁ.bə/
fast|gần như|A1|/fast/
faul|lười|A1|/faʊ̯l/
der Fehler|lỗi|A1|/ˈfeː.lɐ/
feiern|tổ chức tiệc|A1|/ˈfaɪ̯.ɐn/
das Fenster|cửa sổ|A1|/ˈfɛn.stɐ/
die Ferien|kỳ nghỉ|A1|/ˈfeː.ʁi̯ən/
fernsehen|xem tivi|A1|/ˈfɛʁn.zeː.ən/
fertig|xong|A1|/ˈfɛʁ.tɪç/
das Feuer|lửa|A1|/ˈfɔʏ̯.ɐ/
das Fieber|sốt|A1|/ˈfiː.bɐ/
der Film|bộ phim|A1|/fɪlm/
finden|tìm thấy|A1|/ˈfɪn.dən/
der Fisch|con cá|A1|/fɪʃ/
fliegen|bay|A1|/ˈfliː.ɡən/
das Fleisch|thịt|A1|/flaɪ̯ʃ/
fleißig|chăm chỉ|A1|/ˈflaɪ̯.sɪç/
die Flasche|chai|A1|/ˈfla.ʃə/
das Formular|mẫu đơn|A1|/fɔʁ.muˈlaːɐ̯/
fragen|hỏi|A1|/ˈfʁaː.ɡən/
die Frau|phụ nữ|A1|/fʁaʊ̯/
frei|trống|A1|/fʁaɪ̯/
der Freitag|thứ Sáu|A1|/ˈfʁaɪ̯.taːk/
fressen|ăn (động vật)|A1|/ˈfʁɛ.sən/
sich freuen|vui mừng|A1|/ˈfʁɔʏ̯.ən/
der Freund|bạn nam|A1|/fʁɔʏ̯nt/
die Freundin|bạn nữ|A1|/ˈfʁɔʏ̯n.dɪn/
frisch|tươi|A1|/fʁɪʃ/
froh|vui|A1|/fʁoː/
früh|sớm|A1|/fʁyː/
das Frühstück|bữa sáng|A1|/ˈfʁyː.ʃtʏk/
frühstücken|ăn sáng|A1|/ˈfʁyː.ʃtʏ.kən/
der Frühling|mùa xuân|A1|/ˈfʁyː.lɪŋ/
fühlen|cảm thấy|A1|/ˈfyː.lən/
der Fuß|bàn chân|A1|/fuːs/
ganz|khá; toàn|A1|/ɡan t͡s/
der Garten|khu vườn|A1|/ˈɡaʁ.tən/
geben|cho|A1|/ˈɡeː.bən/
geboren|được sinh ra|A1|/ɡəˈboː.ʁən/
der Geburtstag|sinh nhật|A1|/ɡəˈbuːɐ̯t͡s.taːk/
gefallen|làm hài lòng|A1|/ɡəˈfa.lən/
gegen|chống lại|A1|/ˈɡeː.ɡən/
gehen|đi bộ|A1|/ˈɡeː.ən/
gehören|thuộc về|A1|/ɡəˈhøː.ʁən/
gelb|vàng|A1|/ɡɛlp/
das Geld|tiền|A1|/ɡɛlt/
gemeinsam|cùng nhau|A1|/ɡəˈmaɪ̯n.zaːm/
genau|chính xác|A1|/ɡəˈnaʊ̯/
genug|đủ|A1|/ɡəˈnuːk/
geradeaus|đi thẳng|A1|/ɡəˈʁaː.də.aʊ̯s/
gern|thích|A1|/ɡɛʁn/
das Geschäft|cửa hàng|A1|/ɡəˈʃɛft/
gestern|hôm qua|A1|/ˈɡɛs.tɐn/
gesund|khỏe mạnh|A1|/ɡəˈzʊnt/
das Getränk|đồ uống|A1|/ɡəˈtʁɛŋk/
gewinnen|thắng|A1|/ɡəˈvɪ.nən/
gießen|đổ, tưới|A1|/ˈɡiː.sən/
die Gitarre|đàn ghi-ta|A1|/ɡiˈta.ʁə/
der Glück|may mắn|A1|/ɡlʏk/
grau|xám|A1|/ɡʁaʊ̯/
groß|to|A1|/ɡʁoːs/
die Größe|kích cỡ|A1|/ˈɡʁøː.sə/
grün|xanh lá|A1|/ɡʁyːn/
gut|tốt|A1|/ɡuːt/
das Haar|tóc|A1|/haːɐ̯/
haben|có|A1|/ˈhaː.bən/
hallo|xin chào|A1|/haˈloː/
halten|giữ|A1|/ˈhal.tən/
die Hand|bàn tay|A1|/hant/
der Hund|con chó|A1|/hʊnt/
hängen|treo|A1|/ˈhɛ.ŋən/
hassen|ghét|A1|/ˈha.sən/
häufig|thường xuyên|A1|/ˈhɔʏ̯.fɪç/
das Haus|ngôi nhà|A1|/haʊ̯s/
heben|nâng|A1|/ˈheː.bən/
das Heft|vở|A1|/hɛft/
heiraten|kết hôn|A1|/ˈhaɪ̯.ʁaː.tən/
heiß|nóng|A1|/haɪ̯s/
heißen|tên là|A1|/ˈhaɪ̯.sən/
helfen|giúp đỡ|A1|/ˈhɛl.fən/
hell|sáng|A1|/hɛl/
das Hemd|áo sơ mi|A1|/hɛmt/
der Herbst|mùa thu|A1|/hɛʁpst/
der Herr|ông|A1|/hɛʁ/
herzlich|nồng nhiệt|A1|/ˈhɛʁt͡s.lɪç/
heute|hôm nay|A1|/ˈhɔʏ̯.tə/
hier|ở đây|A1|/hiːɐ̯/
die Hilfe|sự giúp đỡ|A1|/ˈhɪl.fə/
der Himmel|bầu trời|A1|/ˈhɪ.məl/
hinten|phía sau|A1|/ˈhɪn.tən/
das Hobby|sở thích|A1|/ˈhɔ.bi/
hoch|cao|A1|/hoːx/
holen|đi lấy|A1|/ˈhoː.lən/
hören|nghe|A1|/ˈhøː.ʁən/
die Hose|cái quần|A1|/ˈhoː.zə/
das Hotel|khách sạn|A1|/hoˈtɛl/
hübsch|xinh|A1|/hʏpʃ/
der Hunger|cơn đói|A1|/ˈhʊ.ŋɐ/
ich|tôi|A1|/ɪç/
immer|luôn|A1|/ˈɪ.mɐ/
in|trong|A1|/ɪn/
die Information|thông tin|A1|/ɪn.fɔʁ.maˈt͡si̯oːn/
das Internet|internet|A1|/ˈɪn.tɐ.nɛt/
ja|vâng|A1|/jaː/
die Jacke|áo khoác|A1|/ˈja.kə/
das Jahr|năm|A1|/jaːɐ̯/
der Januar|tháng Một|A1|/ˈja.nu.aːɐ̯/
jetzt|bây giờ|A1|/jɛt͡st/
der Job|việc làm|A1|/d͡ʒɔp/
der Jugendliche|thanh thiếu niên|A1|/ˈjuː.ɡənt.lɪ.çə/
der Junge|cậu bé|A1|/ˈjʊ.ŋə/
der Kaffee|cà phê|A1|/ˈka.fe/
kalt|lạnh|A1|/kalt/
die Kamera|máy ảnh|A1|/ˈka.me.ʁa/
der Käse|phô mai|A1|/ˈkɛː.zə/
die Kasse|quầy thu ngân|A1|/ˈka.sə/
kaufen|mua|A1|/ˈkaʊ̯.fən/
das Kind|đứa trẻ|A1|/kɪnt/
das Kino|rạp phim|A1|/ˈkiː.no/
klar|rõ ràng|A1|/klaːɐ̯/
die Klasse|lớp học|A1|/ˈkla.sə/
das Kleid|váy liền|A1|/klaɪ̯t/
die Kleidung|quần áo|A1|/ˈklaɪ̯.dʊŋ/
klein|nhỏ|A1|/klaɪ̯n/
klettern|leo trèo|A1|/ˈklɛ.tɐn/
klingeln|reo chuông|A1|/ˈklɪ.ŋəln/
kochen|nấu ăn|A1|/ˈkɔ.xən/
der Koffer|va li|A1|/ˈkɔ.fɐ/
der Kollege|đồng nghiệp|A1|/kɔˈleː.ɡə/
kommen|đến|A1|/ˈkɔ.mən/
können|có thể|A1|/ˈkœ.nən/
das Konto|tài khoản|A1|/ˈkɔn.to/
der Kopf|đầu|A1|/kɔpf/
der Körper|cơ thể|A1|/ˈkœʁ.pɐ/
die Kosten|chi phí|A1|/ˈkɔs.tən/
kosten|giá là|A1|/ˈkɔs.tən/
krank|ốm|A1|/kʁaŋk/
das Krankenhaus|bệnh viện|A1|/ˈkʁaŋ.kən.haʊ̯s/
die Krankheit|bệnh tật|A1|/ˈkʁaŋk.haɪ̯t/
der Kuchen|bánh ngọt|A1|/ˈkuː.xən/
der Kühlschrank|tủ lạnh|A1|/ˈkyːl.ʃʁaŋk/
kühl|mát|A1|/kyːl/
der Kunde|khách hàng|A1|/ˈkʊn.də/
die Küche|nhà bếp|A1|/ˈkʏ.çə/
der Kurs|khóa học|A1|/kʊʁs/
kurz|ngắn|A1|/kʊʁt͡s/
lachen|cười|A1|/ˈla.xən/
der Laden|cửa hàng|A1|/ˈlaː.dən/
das Land|đất nước|A1|/lant/
lang|dài|A1|/laŋ/
langsam|chậm|A1|/ˈlaŋ.zaːm/
langweilig|chán|A1|/ˈlaŋ.vaɪ̯.lɪç/
laufen|chạy|A1|/ˈlaʊ̯.fən/
laut|ồn ào|A1|/laʊ̯t/
leben|sống|A1|/ˈleː.bən/
das Leben|cuộc sống|A1|/ˈleː.bən/
lecker|ngon|A1|/ˈlɛ.kɐ/
legen|để nằm|A1|/ˈleː.ɡən/
der Lehrer|giáo viên|A1|/ˈleː.ʁɐ/
leicht|nhẹ; dễ|A1|/laɪ̯çt/
leider|tiếc là|A1|/ˈlaɪ̯.dɐ/
lernen|học|A1|/ˈlɛʁ.nən/
lesen|đọc|A1|/ˈleː.zən/
letzte|trước|A1|/ˈlɛt͡s.tə/
die Leute|mọi người|A1|/ˈlɔʏ̯.tə/
das Licht|ánh sáng|A1|/lɪçt/
lieben|yêu|A1|/ˈliː.bən/
lieber|thích hơn|A1|/ˈliː.bɐ/
liegen|nằm|A1|/ˈliː.ɡən/
links|bên trái|A1|/lɪŋks/
die List|danh sách|A1|/lɪst/
lösen|giải quyết|A1|/ˈløː.zən/
die Lösung|lời giải|A1|/ˈløː.zʊŋ/
machen|làm|A1|/ˈma.xən/
das Mädchen|cô bé|A1|/ˈmɛːt.çən/
der Mai|tháng Năm|A1|/maɪ̯/
der Mann|đàn ông|A1|/man/
der Markt|chợ|A1|/maʁkt/
die Maus|con chuột|A1|/maʊ̯s/
die Miete|tiền thuê|A1|/ˈmiː.tə/
die Milch|sữa|A1|/mɪlç/
mit|với|A1|/mɪt/
mitbringen|mang theo|A1|/ˈmɪt.bʁɪ.ŋən/
mitkommen|đi cùng|A1|/ˈmɪt.kɔ.mən/
mitnehmen|mang theo|A1|/ˈmɪt.neː.mən/
die Mitte|trung tâm|A1|/ˈmɪ.tə/
das Möbel|đồ nội thất|A1|/ˈmøː.bəl/
möchten|muốn (lịch sự)|A1|/ˈmœç.tən/
die Mode|thời trang|A1|/ˈmoː.də/
mögen|thích|A1|/ˈmøː.ɡən/
der Monat|tháng|A1|/ˈmoː.nat/
der Montag|thứ Hai|A1|/ˈmoːn.taːk/
morgen|ngày mai|A1|/ˈmɔʁ.ɡən/
der Morgen|buổi sáng|A1|/ˈmɔʁ.ɡən/
müde|mệt|A1|/ˈmyː.də/
der Mund|miệng|A1|/mʊnt/
das Museum|bảo tàng|A1|/muˈzeː.ʊm/
die Musik|âm nhạc|A1|/muˈziːk/
müssen|phải|A1|/ˈmʏ.sən/
die Mutter|mẹ|A1|/ˈmʊ.tɐ/
die Mütze|mũ len|A1|/ˈmʏ.t͡sə/
nach|sau|A1|/naːx/
die Nachricht|tin nhắn|A1|/ˈnaːx.ʁɪçt/
nächste|tới|A1|/ˈnɛːç.stə/
die Nacht|đêm|A1|/naxt/
der Name|tên|A1|/ˈnaː.mə/
nass|ướt|A1|/nas/
natürlich|tất nhiên|A1|/naˈtyːɐ̯.lɪç/
neben|bên cạnh|A1|/ˈneː.bən/
nehmen|lấy|A1|/ˈneː.mən/
nein|không|A1|/naɪ̯n/
nennen|gọi tên|A1|/ˈnɛ.nən/
neu|mới|A1|/nɔʏ̯/
nicht|không|A1|/nɪçt/
nichts|không có gì|A1|/nɪçt͡s/
nie|không bao giờ|A1|/niː/
der Niederschlag|lượng mưa|A1|/ˈniː.dɐ.ʃlaːk/
niemand|không ai|A1|/ˈniː.mant/
noch|vẫn|A1|/nɔx/
der Norden|phía bắc|A1|/ˈnɔʁ.dən/
normal|bình thường|A1|/nɔʁˈmaːl/
die Note|điểm|A1|/ˈnoː.tə/
die Nummer|số|A1|/ˈnʊ.mɐ/
nur|chỉ|A1|/nuːɐ̯/
oben|ở trên|A1|/ˈoː.bən/
das Obst|trái cây|A1|/oːpst/
oder|hoặc|A1|/ˈoː.dɐ/
offen|mở|A1|/ˈɔ.fən/
oft|thường|A1|/ɔft/
ohne|không có|A1|/ˈoː.nə/
das Ohr|tai|A1|/oːɐ̯/
die Oma|bà|A1|/ˈoː.ma/
der Onkel|chú|A1|/ˈɔŋ.kəl/
der Opa|ông|A1|/ˈoː.pa/
die Ordnung|trật tự|A1|/ˈɔʁt.nʊŋ/
der Osten|phía đông|A1|/ˈɔs.tən/
das Papier|giấy|A1|/paˈpiːɐ̯/
die Pause|giờ nghỉ|A1|/ˈpaʊ̯.zə/
die Person|người|A1|/pɛʁˈzoːn/
das Pferd|ngựa|A1|/pfeːɐ̯t/
die Pflanze|cây|A1|/ˈpflan.t͡sə/
der Plan|kế hoạch|A1|/plaːn/
der Platz|quảng trường|A1|/plat͡s/
die Polizei|cảnh sát|A1|/po.liˈt͡saɪ̯/
die Post|bưu điện|A1|/pɔst/
der Preis|giá|A1|/pʁaɪ̯s/
das Problem|vấn đề|A1|/pʁoˈbleːm/
das Produkt|sản phẩm|A1|/pʁoˈdʊkt/
der Pullover|áo len|A1|/pʊˈloː.vɐ/
pünktlich|đúng giờ|A1|/ˈpʏŋkt.lɪç/
die Qualität|chất lượng|A1|/kva.liˈtɛːt/
der Rabatt|giảm giá|A1|/ʁaˈbat/
der Regen|mưa|A1|/ˈʁeː.ɡən/
regnen|mưa|A1|/ˈʁeː.ɡnən/
der Reis|gạo|A1|/ʁaɪ̯s/
reisen|du lịch|A1|/ˈʁaɪ̯.zən/
die Reise|chuyến đi|A1|/ˈʁaɪ̯.zə/
rennen|chạy|A1|/ˈʁɛ.nən/
das Restaurant|nhà hàng|A1|/ʁɛs.toˈʁɑ̃/
richtig|đúng|A1|/ˈʁɪç.tɪç/
riechen|ngửi|A1|/ˈʁiː.xən/
der Rock|chân váy|A1|/ʁɔk/
rot|đỏ|A1|/ʁoːt/
der Rücken|lưng|A1|/ˈʁʏ.kən/
der Rucksack|ba lô|A1|/ˈʁʊk.zak/
rufen|gọi|A1|/ˈʁuː.fən/
ruhig|yên tĩnh|A1|/ˈʁuː.ɪç/
rund|tròn|A1|/ʁʊnt/
der Saft|nước ép|A1|/zaft/
sagen|nói|A1|/ˈzaː.ɡən/
der Salat|salad|A1|/zaˈlaːt/
sammeln|sưu tầm|A1|/ˈza.məln/
der Samstag|thứ Bảy|A1|/ˈzam.staːk/
satt|no|A1|/zat/
sauber|sạch|A1|/ˈzaʊ̯.bɐ/
schade|tiếc|A1|/ˈʃaː.də/
scharf|cay|A1|/ʃaʁf/
schauen|nhìn|A1|/ˈʃaʊ̯.ən/
scheinen|chiếu sáng|A1|/ˈʃaɪ̯.nən/
schenken|tặng|A1|/ˈʃɛŋ.kən/
schlafen|ngủ|A1|/ˈʃlaː.fən/
schlecht|xấu|A1|/ʃlɛçt/
schließen|đóng|A1|/ˈʃliː.sən/
der Schlüssel|chìa khóa|A1|/ˈʃlʏ.səl/
schmecken|có vị|A1|/ˈʃmɛ.kən/
schmutzig|bẩn|A1|/ˈʃmʊ.t͡sɪç/
der Schnee|tuyết|A1|/ʃneː/
schneien|tuyết rơi|A1|/ˈʃnaɪ̯.ən/
schnell|nhanh|A1|/ʃnɛl/
schön|đẹp|A1|/ʃøːn/
der Schrank|cái tủ|A1|/ʃʁaŋk/
schreiben|viết|A1|/ˈʃʁaɪ̯.bən/
der Schuh|giày|A1|/ʃuː/
die Schule|trường học|A1|/ˈʃuː.lə/
der Schüler|học sinh|A1|/ˈʃyː.lɐ/
schwimmen|bơi|A1|/ˈʃvɪ.mən/
schwarz|đen|A1|/ʃvaʁt͡s/
schwer|khó; nặng|A1|/ʃveːɐ̯/
die Schwester|chị/em gái|A1|/ˈʃvɛs.tɐ/
sehr|rất|A1|/zeːɐ̯/
sein|là|A1|/zaɪ̯n/
seit|từ|A1|/zaɪ̯t/
die Seite|trang|A1|/ˈzaɪ̯.tə/
der Sekt|sâm panh|A1|/zɛkt/
selbst|tự mình|A1|/zɛlpst/
selten|hiếm khi|A1|/ˈzɛl.tən/
der September|tháng Chín|A1|/zɛpˈtɛm.bɐ/
setzen|đặt, để|A1|/ˈzɛ.t͡sən/
sicher|chắc chắn|A1|/ˈzɪ.çɐ/
singen|hát|A1|/ˈzɪ.ŋən/
sitzen|ngồi|A1|/ˈzɪ.t͡sən/
so|như vậy|A1|/zoː/
das Sofa|ghế sofa|A1|/ˈzoː.fa/
sogar|thậm chí|A1|/zoˈɡaːɐ̯/
der Sohn|con trai|A1|/zoːn/
solch|như thế|A1|/zɔlç/
sollen|nên|A1|/ˈzɔ.lən/
der Sommer|mùa hè|A1|/ˈzɔ.mɐ/
die Sonne|mặt trời|A1|/ˈzɔ.nə/
sonnig|nắng|A1|/ˈzɔ.nɪç/
der Sonntag|Chủ nhật|A1|/ˈzɔn.taːk/
sonst|nếu không|A1|/zɔnst/
sparen|tiết kiệm|A1|/ˈʃpaː.ʁən/
der Spaß|niềm vui|A1|/ʃpaːs/
spät|muộn|A1|/ʃpɛːt/
spazieren|đi dạo|A1|/ʃpaˈt͡siː.ʁən/
der Speisesaal|phòng ăn|A1|/ˈʃpaɪ̯.zə.zaːl/
spielen|chơi|A1|/ˈʃpiː.lən/
die Sprache|ngôn ngữ|A1|/ˈʃpʁaː.xə/
sprechen|nói|A1|/ˈʃpʁɛ.çən/
springen|nhảy|A1|/ˈʃpʁɪ.ŋən/
die Stadt|thành phố|A1|/ʃtat/
der Stall|chuồng|A1|/ʃtal/
stark|mạnh|A1|/ʃtaʁk/
statt|thay vì|A1|/ʃtat/
stehen|đứng|A1|/ˈʃteː.ən/
steigen|leo, tăng|A1|/ˈʃtaɪ̯.ɡən/
der Stein|đá|A1|/ʃtaɪ̯n/
stellen|đặt|A1|/ˈʃtɛ.lən/
sterben|chết|A1|/ˈʃtɛʁ.bən/
der Stern|ngôi sao|A1|/ʃtɛʁn/
die Steuer|thuế|A1|/ˈʃtɔʏ̯.ɐ/
der Stift|bút|A1|/ʃtɪft/
stimmen|đúng|A1|/ˈʃtɪ.mən/
die Stirn|trán|A1|/ʃtɪʁn/
der Stoff|chất liệu|A1|/ʃtɔf/
stolz|tự hào|A1|/ʃtɔlt͡s/
stören|làm phiền|A1|/ˈʃtøː.ʁən/
die Straße|con phố|A1|/ˈʃtʁaː.sə/
streiten|cãi nhau|A1|/ˈʃtʁaɪ̯.tən/
das Stück|miếng|A1|/ʃtʏk/
der Student|sinh viên|A1|/ʃtuˈdɛnt/
studieren|học đại học|A1|/ʃtuˈdiː.ʁən/
das Studium|việc học|A1|/ˈʃtuː.di̯ʊm/
die Stunde|giờ|A1|/ˈʃtʊn.də/
suchen|tìm|A1|/ˈzuː.xən/
der Süden|phía nam|A1|/ˈzyː.dən/
süß|ngọt|A1|/zyːs/
tanzen|nhảy|A1|/ˈtan.t͡sən/
die Tasche|túi|A1|/ˈta.ʃə/
das Taschentuch|khăn tay|A1|/ˈta.ʃən.tuːx/
die Tasse|tách|A1|/ˈta.sə/
die Tafel|bảng|A1|/ˈtaː.fəl/
der Tag|ngày|A1|/taːk/
das Tal|thung lũng|A1|/taːl/
die Tante|cô|A1|/ˈtan.tə/
teuer|đắt|A1|/ˈtɔʏ̯.ɐ/
der Tee|trà|A1|/teː/
teilen|chia sẻ|A1|/ˈtaɪ̯.lən/
das Telefon|điện thoại|A1|/te.leˈfoːn/
telefonieren|gọi điện|A1|/te.le.foˈniː.ʁən/
der Teller|cái đĩa|A1|/ˈtɛ.lɐ/
das Thema|chủ đề|A1|/ˈteː.ma/
die Theorie|lý thuyết|A1|/te.oˈʁiː/
tief|sâu|A1|/tiːf/
das Tier|con vật|A1|/tiːɐ̯/
der Tisch|cái bàn|A1|/tɪʃ/
die Tochter|con gái|A1|/ˈtɔx.tɐ/
die Toilette|nhà vệ sinh|A1|/to̯aˈlɛ.tə/
toll|tuyệt|A1|/tɔl/
die Tomate|cà chua|A1|/toˈmaː.tə/
der Topf|nồi|A1|/tɔpf/
das Tor|cổng|A1|/toːɐ̯/
tot|chết|A1|/toːt/
tragen|mặc|A1|/ˈtʁaː.ɡən/
traurig|buồn|A1|/ˈtʁaʊ̯.ʁɪç/
treffen|gặp|A1|/ˈtʁɛ.fən/
treiben|thúc đẩy|A1|/ˈtʁaɪ̯.bən/
trennen|tách ra|A1|/ˈtʁɛ.nən/
die Treppe|cầu thang|A1|/ˈtʁɛ.pə/
trinken|uống|A1|/ˈtʁɪŋ.kən/
trocken|khô|A1|/ˈtʁɔ.kən/
die Tube|tuýp|A1|/ˈtuː.bə/
das Tuch|khăn|A1|/tuːx/
tun|làm|A1|/tuːn/
die Tür|cửa|A1|/tyːɐ̯/
der Turm|tòa tháp|A1|/tʊʁm/
die U-Bahn|tàu điện ngầm|A1|/ˈuː.baːn/
üben|luyện tập|A1|/ˈyː.bən/
über|trên|A1|/ˈyː.bɐ/
die Übung|bài luyện tập|A1|/ˈyː.bʊŋ/
die Uhr|đồng hồ|A1|/uːɐ̯/
um|quanh|A1|/ʊm/
und|và|A1|/ʊnt/
der Unfall|tai nạn|A1|/ˈʊn.fal/
uns|chúng tôi|A1|/ʊns/
unser|của chúng tôi|A1|/ˈʊn.zɐ/
unten|ở dưới|A1|/ˈʊn.tən/
unter|dưới|A1|/ˈʊn.tɐ/
der Unterricht|giờ học|A1|/ˈʊn.tɐ.ʁɪçt/
die Universität|đại học|A1|/u.ni.vɛʁ.ziˈtɛːt/
der Urlaub|kỳ nghỉ|A1|/ˈuːɐ̯.laʊ̯p/
der Vater|bố|A1|/ˈfaː.tɐ/
der Verkäufer|người bán hàng|A1|/fɛɐ̯ˈkɔʏ̯.fɐ/
verkaufen|bán|A1|/fɛɐ̯ˈkaʊ̯.fən/
der Verkehr|giao thông|A1|/fɛɐ̯ˈkeːɐ̯/
verlieren|mất, thua|A1|/fɛɐ̯ˈliː.ʁən/
verstehen|hiểu|A1|/fɛɐ̯ˈʃteː.ən/
viel|nhiều|A1|/fiːl/
vielleicht|có lẽ|A1|/fiˈlaɪ̯çt/
der Vogel|chim|A1|/ˈfoː.ɡəl/
voll|đầy|A1|/fɔl/
von|của|A1|/fɔn/
vor|trước|A1|/foːɐ̯/
vorbereiten|chuẩn bị|A1|/ˈfoːɐ̯.bə.ʁaɪ̯.tən/
der Vormittag|buổi sáng|A1|/ˈfoːɐ̯.mɪ.tak/
vorne|phía trước|A1|/ˈfɔʁ.nə/
wachsen|mọc|A1|/ˈvak.sən/
wählen|chọn|A1|/ˈvɛː.lən/
wahr|đúng|A1|/vaːɐ̯/
wahrscheinlich|có lẽ|A1|/vaːɐ̯ˈʃaɪ̯n.lɪç/
die Wand|bức tường|A1|/vant/
wandern|đi bộ đường dài|A1|/ˈvan.dɐn/
wann|khi nào|A1|/van/
warm|ấm|A1|/vaʁm/
warten|đợi|A1|/ˈvaʁ.tən/
warum|tại sao|A1|/vaˈʁʊm/
was|cái gì|A1|/vas/
waschen|rửa, giặt|A1|/ˈva.ʃən/
das Wasser|nước|A1|/ˈva.sɐ/
wechseln|thay đổi|A1|/ˈvɛk.səln/
der Weg|con đường|A1|/veːk/
wegen|vì|A1|/ˈveː.ɡən/
weiblich|nữ|A1|/ˈvaɪ̯p.lɪç/
weich|mềm|A1|/vaɪ̯ç/
weil|vì|A1|/vaɪ̯l/
der Wein|rượu vang|A1|/vaɪ̯n/
weiß|trắng|A1|/vaɪ̯s/
weit|xa|A1|/vaɪ̯t/
welcher|nào|A1|/ˈvɛl.çɐ/
die Welt|thế giới|A1|/vɛlt/
wenden|quay, lật|A1|/ˈvɛn.dən/
wenig|ít|A1|/ˈveː.nɪç/
wenn|nếu|A1|/vɛn/
wer|ai|A1|/veːɐ̯/
werden|trở thành|A1|/ˈveːɐ̯.dən/
werfen|ném|A1|/ˈvɛʁ.fən/
das Werk|tác phẩm|A1|/vɛʁk/
der Wert|giá trị|A1|/veːɐ̯t/
der Westen|phía tây|A1|/ˈvɛs.tən/
das Wetter|thời tiết|A1|/ˈvɛ.tɐ/
wichtig|quan trọng|A1|/ˈvɪç.tɪç/
wie|như thế nào|A1|/viː/
wieder|lại|A1|/ˈviː.dɐ/
wiederholen|nhắc lại|A1|/viː.dɐˈhoː.lən/
wiegen|cân|A1|/ˈviː.ɡən/
die Wiese|đồng cỏ|A1|/ˈviː.zə/
der Wind|gió|A1|/vɪnt/
der Winter|mùa đông|A1|/ˈvɪn.tɐ/
wir|chúng tôi|A1|/viːɐ̯/
wissen|biết|A1|/ˈvɪ.sən/
wo|ở đâu|A1|/voː/
die Woche|tuần|A1|/ˈvɔ.xə/
das Wochenende|cuối tuần|A1|/ˈvɔ.xən.ɛn.də/
wohl|khỏe|A1|/voːl/
wohnen|sống, ở|A1|/ˈvoː.nən/
die Wohnung|căn hộ|A1|/ˈvoː.nʊŋ/
das Wohnzimmer|phòng khách|A1|/ˈvoːn.t͡sɪ.mɐ/
wollen|muốn|A1|/ˈvɔ.lən/
das Wort|từ|A1|/vɔʁt/
wünschen|chúc; mong|A1|/ˈvʏn.ʃən/
die Wurst|xúc xích|A1|/vʊʁst/
die Zahl|con số|A1|/t͡saːl/
zahlen|thanh toán|A1|/ˈt͡saː.lən/
der Zahn|răng|A1|/t͡saːn/
zeigen|chỉ|A1|/ˈt͡saɪ̯.ɡən/
die Zeit|thời gian|A1|/t͡saɪ̯t/
die Zeitung|báo|A1|/ˈt͡saɪ̯.tʊŋ/
das Zelt|lều|A1|/t͡sɛlt/
zerstören|phá hủy|A1|/t͡sɛɐ̯ˈʃtøː.ʁən/
das Zeugnis|chứng chỉ|A1|/ˈt͡sɔʏ̯k.nɪs/
ziehen|kéo|A1|/ˈt͡siː.ən/
das Ziel|mục tiêu|A1|/t͡siːl/
ziemlich|khá|A1|/ˈt͡siːm.lɪç/
das Zimmer|căn phòng|A1|/ˈt͡sɪ.mɐ/
die Zitrone|quả chanh|A1|/t͡siˈtʁoː.nə/
zu|đến|A1|/t͡suː/
der Zucker|đường|A1|/ˈt͡sʊ.kɐ/
zuerst|trước tiên|A1|/t͡suˈeːɐ̯st/
der Zug|tàu|A1|/t͡suːk/
zurück|trở lại|A1|/t͡suˈʁʏk/
zusammen|cùng nhau|A1|/t͡suˈza.mən/
zwischen|giữa|A1|/ˈt͡svɪ.ʃən/
die Zwischenzeit|thời gian chờ|A1|/ˈt͡svɪ.ʃən.t͡saɪ̯t/
der Zwilling|anh em sinh đôi|A1|/ˈt͡svɪ.lɪŋ/
zwingen|ép buộc|A1|/ˈt͡svɪ.ŋən/
der Zwiebel|hành tây|A1|/ˈt͡sviː.bəl/
zwölf|mười hai|A1|/t͡svœlf/
die Zypresse|cây bách|A1|/t͡syˈpʁɛ.sə/
die Abfahrt|sự khởi hành|A2|/ˈap.faːɐ̯t/
die Absicht|ý định|A2|/ˈap.zɪçt/
der Alltag|ngày thường|A2|/ˈal.taːk/
allerdings|tuy nhiên|A2|/ˈal.lɐ.dɪŋs/
allgemein|chung|A2|/ˈal.ɡə.maɪ̯n/
die Anzeige|quảng cáo|A2|/ˈan.t͡saɪ̯.ɡə/
die Apotheke|hiệu thuốc|A2|/a.poˈteː.kə/
der Appetit|sự ngon miệng|A2|/a.peˈtiːt/
der Artikel|bài báo|A2|/aʁˈtiː.kəl/
aufstehen|thức dậy|A2|/ˈaʊ̯f.ʃteː.ən/
ausgeben|tiêu tiền|A2|/ˈaʊ̯s.ɡeː.bən/
ausgezeichnet|xuất sắc|A2|/ˈaʊ̯s.ɡə.t͡saɪ̯ç.nət/
die Auskunft|thông tin|A2|/ˈaʊ̯s.kʊnft/
das Ausland|nước ngoài|A2|/ˈaʊ̯s.lant/
ausmachen|tắt|A2|/ˈaʊ̯s.ma.xən/
die Ausstellung|triển lãm|A2|/ˈaʊ̯s.ʃtɛ.lʊŋ/
der Ausweis|chứng minh thư|A2|/ˈaʊ̯s.vaɪ̯s/
der Automat|máy tự động|A2|/aʊ̯.toˈmaːt/
der Balkon|ban công|A2|/balˈkɔ̃ː/
die Bank|ngân hàng|A2|/baŋk/
der Bart|râu|A2|/baːɐ̯t/
die Batterie|pin|A2|/ba.təˈʁiː/
der Bauernhof|nông trại|A2|/ˈbaʊ̯.ɐn.hoːf/
bedeuten|có nghĩa là|A2|/bəˈdɔʏ̯.tən/
behalten|giữ lại|A2|/bəˈhal.tən/
beides|cả hai|A2|/ˈbaɪ̯.dəs/
das Beispiel|ví dụ|A2|/ˈbaɪ̯.ʃpiːl/
bekannt|nổi tiếng|A2|/bəˈkant/
beliebt|được yêu thích|A2|/bəˈliːpt/
bemerken|nhận thấy|A2|/bəˈmɛʁ.kən/
bequem|thoải mái|A2|/bəˈkveːm/
bereits|đã rồi|A2|/bəˈʁaɪ̯t͡s/
berichten|báo cáo|A2|/bəˈʁɪç.tən/
berühmt|nổi tiếng|A2|/bəˈʁyːmt/
beschäftigt|bận rộn|A2|/bəˈʃɛf.tɪçt/
besonders|đặc biệt|A2|/bəˈzɔn.dɐs/
besser|tốt hơn|A2|/ˈbɛ.sɐ/
bestimmt|chắc chắn|A2|/bəˈʃtɪmt/
die Bibliothek|thư viện|A2|/bi.bli.oˈteːk/
das Billett|vé|A2|/biˈlɛt/
der Blick|cái nhìn|A2|/blɪk/
der Bodensee|hồ Bodensee|A2|/ˈboː.dən.zeː/
die Bühne|sân khấu|A2|/ˈbyː.nə/
der Brunnen|cái giếng|A2|/ˈbʁʊ.nən/
das Bügeleisen|bàn là|A2|/ˈbyː.ɡəl.aɪ̯.zən/
die Bushaltestelle|trạm xe buýt|A2|/ˈbʊs.hal.tə.ʃtɛ.lə/
der Charakter|tính cách|A2|/kaˈʁak.tɐ/
der Comic|truyện tranh|A2|/ˈkɔ.mɪk/
die Creme|kem|A2|/kʁeːm/
deshalb|vì thế|A2|/ˈdɛs.halp/
deswegen|do đó|A2|/ˈdɛs.veː.ɡən/
der Dieb|kẻ trộm|A2|/diːp/
der Dienstag|thứ Ba|A2|/ˈdiːns.taːk/
das Ding|đồ vật|A2|/dɪŋ/
der Direktor|giám đốc|A2|/diˈʁɛk.toːɐ̯/
die Disco|sàn nhảy|A2|/ˈdɪs.ko/
der Dom|nhà thờ lớn|A2|/doːm/
der Donnerstag|thứ Năm|A2|/ˈdɔ.nɐs.taːk/
das Dorf|ngôi làng|A2|/dɔʁf/
draußen|bên ngoài|A2|/ˈdʁaʊ̯.sən/
drehen|quay|A2|/ˈdʁeː.ən/
dringend|khẩn cấp|A2|/ˈdʁɪ.ŋənt/
der Druck|cơn áp lực|A2|/dʁʊk/
der Durst|cơn khát|A2|/dʊʁst/
die Ehe|hôn nhân|A2|/ˈeː.ə/
ehrlich|trung thực|A2|/ˈeːɐ̯.lɪç/
das Eigentum|tài sản|A2|/ˈaɪ̯.ɡən.tuːm/
eigentlich|thật ra|A2|/ˈaɪ̯.ɡənt.lɪç/
eilen|vội vã|A2|/ˈaɪ̯.lən/
der Eingang|lối vào|A2|/ˈaɪ̯n.ɡaŋ/
einmal|một lần|A2|/ˈaɪ̯n.maːl/
einnehmen|thu nhận|A2|/ˈaɪ̯n.neː.mən/
einsam|cô đơn|A2|/ˈaɪ̯n.zaːm/
eintreten|bước vào|A2|/ˈaɪ̯n.tʁeː.tən/
die Empfehlung|lời khuyên|A2|/ɛmˈpfeː.lʊŋ/
enthalten|chứa|A2|/ɛntˈhal.tən/
entlang|dọc theo|A2|/ɛntˈlaŋ/
entscheiden|quyết định|A2|/ɛntˈʃaɪ̯.dən/
die Entwicklung|sự phát triển|A2|/ɛntˈvɪk.lʊŋ/
erfinden|phát minh|A2|/ɛɐ̯ˈfɪn.dən/
erhalten|nhận được|A2|/ɛɐ̯ˈhal.tən/
sich erholen|nghỉ ngơi|A2|/ɛɐ̯ˈhoː.lən/
erklären|giải thích|A2|/ɛɐ̯ˈklɛː.ʁən/
erlauben|cho phép|A2|/ɛɐ̯ˈlaʊ̯.bən/
erleben|trải nghiệm|A2|/ɛɐ̯ˈleː.bən/
ernst|nghiêm túc|A2|/ɛʁnst/
erreichen|đạt được|A2|/ɛɐ̯ˈʁaɪ̯.çən/
erscheinen|xuất hiện|A2|/ɛɐ̯ˈʃaɪ̯.nən/
ersetzen|thay thế|A2|/ɛɐ̯ˈzɛ.t͡sən/
erzählen|kể|A2|/ɛɐ̯ˈt͡sɛː.lən/
die Fabrik|nhà máy|A2|/faˈbʁiːk/
das Fach|môn học|A2|/fax/
die Fahrt|chuyến đi|A2|/faːɐ̯t/
der Fall|trường hợp|A2|/fal/
der Fan|cổ động viên|A2|/fɛn/
faulenzen|lười biếng|A2|/ˈfaʊ̯.lɛn.t͡sən/
der Feiertag|ngày lễ|A2|/ˈfaɪ̯.ɐ.taːk/
das Feld|cánh đồng|A2|/fɛlt/
fern|xa|A2|/fɛʁn/
das Fest|lễ hội|A2|/fɛst/
feucht|ẩm ướt|A2|/fɔʏ̯çt/
das Feuerwehr|đội cứu hỏa|A2|/ˈfɔʏ̯.ɐ.veːɐ̯/
die Firma|công ty|A2|/ˈfɪʁ.ma/
die Flöte|sáo|A2|/ˈfløː.tə/
der Fluch|lời nguyền rủa|A2|/fluːx/
der Fluss|con sông|A2|/flʊs/
die Folge|hệ quả|A2|/ˈfɔl.ɡə/
die Form|hình dạng|A2|/fɔʁm/
das Foto|bức ảnh|A2|/ˈfoː.to/
die Frage|câu hỏi|A2|/ˈfʁaː.ɡə/
die Freizeit|thời gian rảnh|A2|/ˈfʁaɪ̯.t͡saɪ̯t/
fremd|lạ|A2|/fʁɛmt/
der Frieden|hòa bình|A2|/ˈfʁiː.dən/
frieren|đóng băng|A2|/ˈfʁiː.ʁən/
die Frucht|trái cây|A2|/fʁʊxt/
das Frühstück|bữa sáng|A2|/ˈfʁyː.ʃtʏk/
führen|dẫn đầu|A2|/ˈfyː.ʁən/
der Führer|người hướng dẫn|A2|/ˈfyː.ʁɐ/
der Fund|sự tìm thấy|A2|/fʊnt/
der Fußball|bóng đá|A2|/ˈfuːs.bal/
das Gas|khí ga|A2|/ɡaːs/
der Gast|khách|A2|/ɡast/
das Gebiet|khu vực|A2|/ɡəˈbiːt/
das Gebäude|tòa nhà|A2|/ɡəˈbɔʏ̯.də/
das Gebot|điều răn|A2|/ɡəˈboːt/
der Gebrauch|việc sử dụng|A2|/ɡəˈbʁaʊ̯x/
geduldig|kiên nhẫn|A2|/ɡəˈdʊl.dɪç/
die Gefahr|nguy hiểm|A2|/ɡəˈfaːɐ̯/
das Gefängnis|nhà tù|A2|/ɡəˈfɛŋ.nɪs/
das Gegenteil|điều ngược lại|A2|/ˈɡeː.ɡən.taɪ̯l/
der Gegner|đối thủ|A2|/ˈɡeː.ɡnɐ/
geheim|bí mật|A2|/ɡəˈhaɪ̯m/
das Gehalt|tiền lương|A2|/ɡəˈhalt/
der Geist|tinh thần|A2|/ɡaɪ̯st/
die Gelegenheit|cơ hội|A2|/ɡəˈleː.ɡən.haɪ̯t/
das Gemüse|rau củ|A2|/ɡəˈmyː.zə/
gemütlich|ấm cúng|A2|/ɡəˈmyːt.lɪç/
der General|tướng quân|A2|/ɡe.neˈʁaːl/
genießen|thưởng thức|A2|/ɡəˈniː.sən/
das Genie|thiên tài|A2|/ʒeˈniː/
die Gerechtigkeit|công lý|A2|/ɡəˈʁɛç.tɪç.kaɪ̯t/
das Gericht|tòa án|A2|/ɡəˈʁɪçt/
der Geschmack|hương vị|A2|/ɡəˈʃmak/
das Gesicht|khuôn mặt|A2|/ɡəˈzɪçt/
die Gesellschaft|xã hội|A2|/ɡəˈzɛl.ʃaft/
das Gesetz|luật pháp|A2|/ɡəˈzɛt͡s/
das Gespräch|cuộc trò chuyện|A2|/ɡəˈʃpʁɛːç/
die Gesundheit|sức khỏe|A2|/ɡəˈzʊnt.haɪ̯t/
das Gewicht|cân nặng|A2|/ɡəˈvɪçt/
das Gewitter|giông bão|A2|/ɡəˈvɪ.tɐ/
gewöhnen|quen với|A2|/ɡəˈvøː.nən/
der Gipfel|đỉnh núi|A2|/ˈɡɪp.fəl/
das Glas|cái ly|A2|/ɡlaːs/
glauben|tin|A2|/ˈɡlaʊ̯.bən/
gleich|ngay|A2|/ɡlaɪ̯ç/
das Gleis|đường ray|A2|/ɡlaɪ̯s/
der Glanz|sự tỏa sáng|A2|/ɡlant͡s/
der Grad|độ|A2|/ɡʁaːt/
gratulieren|chúc mừng|A2|/ɡʁa.tuˈliː.ʁən/
das Gras|cỏ|A2|/ɡʁaːs/
die Grenze|biên giới|A2|/ˈɡʁɛn.t͡sə/
die Großmutter|bà|A2|/ˈɡʁoːs.mʊ.tɐ/
der Großvater|ông|A2|/ˈɡʁoːs.faː.tɐ/
die Gruppe|nhóm|A2|/ˈɡʁʊ.pə/
der Gruß|lời chào|A2|/ɡʁuːs/
der Grund|lý do|A2|/ɡʁʊnt/
die Grundschule|trường tiểu học|A2|/ˈɡʁʊnt.ʃuː.lə/
gucken|nhìn|A2|/ˈɡʊ.kən/
günstig|thuận lợi|A2|/ˈɡʏn.stɪç/
der Hafen|cảng|A2|/ˈhaː.fən/
die Halle|hội trường|A2|/ˈha.lə/
der Hals|cổ|A2|/hals/
die Haltestelle|trạm dừng|A2|/ˈhal.tə.ʃtɛ.lə/
das Handtuch|khăn tắm|A2|/ˈhant.tuːx/
die Handtasche|túi xách|A2|/ˈhant.ta.ʃə/
das Handy|điện thoại|A2|/ˈhɛn.di/
hart|cứng|A2|/haʁt/
die Hausfrau|nội trợ|A2|/ˈhaʊ̯s.fʁaʊ̯/
die Heimat|quê hương|A2|/ˈhaɪ̯.maːt/
der Helm|mũ bảo hiểm|A2|/hɛlm/
der Herd|bếp lò|A2|/heːɐ̯t/
das Herz|trái tim|A2|/hɛʁt͡s/
das Hindernis|chướng ngại vật|A2|/ˈhɪn.dɐ.nɪs/
hinter|phía sau|A2|/ˈhɪn.tɐ/
der Hintern|mông|A2|/ˈhɪn.tɐn/
der Hof|sân|A2|/hoːf/
hoffen|hy vọng|A2|/ˈhɔ.fən/
hoffentlich|hy vọng rằng|A2|/ˈhɔ.fənt.lɪç/
die Hochzeit|đám cưới|A2|/ˈhɔx.t͡saɪ̯t/
das Holz|gỗ|A2|/hɔlt͡s/
die Industrie|công nghiệp|A2|/ɪn.dʊsˈtʁiː/
der Ingenieur|kỹ sư|A2|/ɪn.ʒeˈni̯øːɐ̯/
das Insekt|côn trùng|A2|/ɪnˈzɛkt/
das Instrument|nhạc cụ|A2|/ɪn.stʁuˈmɛnt/
das Interesse|sự quan tâm|A2|/ɪn.təˈʁɛ.sə/
interessant|thú vị|A2|/ɪn.tə.ʁɛˈsant/
die Insel|hòn đảo|A2|/ˈɪn.zəl/
der Jahrgang|niên khóa|A2|/ˈjaːɐ̯.ɡaŋ/
die Jahreszeit|mùa|A2|/ˈjaː.ʁəs.t͡saɪ̯t/
die Jeans|quần bò|A2|/d͡ʒiːns/
jedoch|tuy nhiên|A2|/jeˈdɔx/
der Juli|tháng 7|A2|/ˈjuː.li/
der Juni|tháng 6|A2|/ˈjuː.ni/
der Kaiser|hoàng đế|A2|/ˈkaɪ̯.zɐ/
der Kamin|lò sưởi|A2|/kaˈmiːn/
der Kampf|cuộc chiến|A2|/kampf/
das Kanu|xuồng|A2|/ˈka.nu/
die Karte|thẻ|A2|/ˈkaʁ.tə/
die Kartoffel|khoai tây|A2|/kaʁˈtɔ.fəl/
die Katze|con mèo|A2|/ˈka.t͡sə/
das Kaufhaus|cửa hàng bách hóa|A2|/ˈkaʊ̯f.haʊ̯s/
kaum|hầu như không|A2|/kaʊ̯m/
kein|không|A2|/kaɪ̯n/
der Keller|tầng hầm|A2|/ˈkɛ.lɐ/
der Kellner|bồi bàn|A2|/ˈkɛl.nɐ/
kennen|biết|A2|/ˈkɛ.nən/
die Kenntnis|kiến thức|A2|/ˈkɛnt.nɪs/
der Kiosk|quầy báo|A2|/ˈkiː.ɔsk/
die Kirche|nhà thờ|A2|/ˈkɪʁ.çə/
das Klavier|đàn piano|A2|/klaˈviːɐ̯/
kleben|dán|A2|/ˈkleː.bən/
klopfen|gõ cửa|A2|/ˈklɔ.pfən/
der Knabe|cậu bé|A2|/ˈknaː.bə/
kneifen|véo|A2|/ˈknaɪ̯.fən/
der Knopf|cúc áo|A2|/knɔpf/
korrigieren|sửa lỗi|A2|/kɔ.ʁiˈɡiː.ʁən/
die Kraft|sức mạnh|A2|/kʁaft/
der Kreis|vòng tròn|A2|/kʁaɪ̯s/
die Kreide|phấn viết|A2|/ˈkʁaɪ̯.də/
der Krieg|chiến tranh|A2|/kʁiːk/
der Kugelschreiber|bút bi|A2|/ˈkuː.ɡəl.ʃʁaɪ̯.bɐ/
die Kunst|nghệ thuật|A2|/kʊnst/
der Lärm|tiếng ồn|A2|/lɛʁm/
die Last|gánh nặng|A2|/last/
die Laune|tâm trạng|A2|/ˈlaʊ̯.nə/
der Lebenslauf|sơ yếu lý lịch|A2|/ˈleː.bəns.laʊ̯f/
leise|nhỏ|A2|/ˈlaɪ̯.zə/
lieb|đáng yêu|A2|/liːp/
das Lied|bài hát|A2|/liːt/
der Lift|thang máy|A2|/lɪft/
der Link|đường link|A2|/lɪŋk/
die Lippe|môi|A2|/ˈlɪ.pə/
die Liste|danh sách|A2|/ˈlɪs.tə/
der Lkw|xe tải|A2|/ˌɛl.kaːˈveː/
das Loch|lỗ|A2|/lɔx/
der Löffel|thìa|A2|/ˈlœ.fəl/
die Logik|logic|A2|/ˈloː.ɡɪk/
sich lohnen|đáng giá|A2|/ˈloː.nən/
das Los|số phận|A2|/loːs/
die Macht|quyền lực|A2|/maxt/
die Magie|phép thuật|A2|/maˈɡiː/
die Mail|thư điện tử|A2|/meːl/
die Mahlzeit|bữa ăn|A2|/ˈmaːl.t͡saɪ̯t/
die Mannschaft|đội|A2|/ˈman.ʃaft/
der Mantel|áo khoác|A2|/ˈman.təl/
die Mappe|cặp tài liệu|A2|/ˈma.pə/
die Mauer|bức tường|A2|/ˈmaʊ̯.ɐ/
die Medizin|thuốc|A2|/me.diˈt͡siːn/
das Meer|biển|A2|/meːɐ̯/
mehr|nhiều hơn|A2|/meːɐ̯/
die Mehrheit|đa số|A2|/ˈmeːɐ̯.haɪ̯t/
meinen|cho rằng|A2|/ˈmaɪ̯.nən/
die Meinung|ý kiến|A2|/ˈmaɪ̯.nʊŋ/
der Meister|bậc thầy|A2|/ˈmaɪ̯.stɐ/
die Melodie|giai điệu|A2|/me.loˈdiː/
die Menge|số lượng|A2|/ˈmɛ.ŋə/
der Mensch|con người|A2|/mɛnʃ/
die Messe|hội chợ|A2|/ˈmɛ.sə/
das Messer|con dao|A2|/ˈmɛ.sɐ/
der Meter|mét|A2|/ˈmeː.tɐ/
die Minderheit|thiểu số|A2|/ˈmɪn.dɐ.haɪ̯t/
der Minirock|váy ngắn|A2|/ˈmɪ.ni.ʁɔk/
die Minute|phút|A2|/miˈnuː.tə/
das Mitglied|thành viên|A2|/ˈmɪt.ɡliːt/
das Mittel|phương tiện|A2|/ˈmɪ.təl/
der Mond|mặt trăng|A2|/moːnt/
der Nachbar|hàng xóm|A2|/ˈnax.baːɐ̯/
der Nachteil|nhược điểm|A2|/ˈnaːx.taɪ̯l/
die Natur|tự nhiên|A2|/naˈtuːɐ̯/
der Nebel|sương mù|A2|/ˈneː.bəl/
das Netz|lưới|A2|/nɛt͡s/
die Neuigkeit|tin mới|A2|/ˈnɔʏ̯.ɪç.kaɪ̯t/
nun|bây giờ|A2|/nuːn/
der Offizier|sĩ quan|A2|/ɔ.fiˈt͡siːɐ̯/
die Oper|nhà hát opera|A2|/ˈoː.pɐ/
das Paar|cặp đôi|A2|/paːɐ̯/
das Paket|bưu kiện|A2|/paˈkeːt/
das Pflaster|băng dán|A2|/ˈpflas.tɐ/
die Pflaume|quả mận|A2|/ˈpflaʊ̯.mə/
das Praktikum|thực tập|A2|/ˈpʁak.ti.kʊm/
der Präsident|tổng thống|A2|/pʁɛ.ziˈdɛnt/
die Prüfung|kỳ thi|A2|/ˈpʁyː.fʊŋ/
die Puppe|búp bê|A2|/ˈpʊ.pə/
die Quelle|nguồn|A2|/ˈkvɛ.lə/
der Rahm|kem|A2|/ʁaːm/
der Rand|rìa|A2|/ʁant/
der Rat|lời khuyên|A2|/ʁaːt/
das Rathaus|tòa thị chính|A2|/ˈʁaːt.haʊ̯s/
rauchen|hút thuốc|A2|/ˈʁaʊ̯.xən/
der Raum|căn phòng|A2|/ʁaʊ̯m/
die Rechnung|hóa đơn|A2|/ˈʁɛç.nʊŋ/
die Regel|quy tắc|A2|/ˈʁeː.ɡəl/
regelmäßig|đều đặn|A2|/ˈʁeː.ɡəl.mɛː.sɪç/
der Reichtum|sự giàu có|A2|/ˈʁaɪ̯ç.tuːm/
die Reihe|hàng|A2|/ˈʁaɪ̯.ə/
der Reifen|lốp xe|A2|/ˈʁaɪ̯.fən/
die Rente|lương hưu|A2|/ˈʁɛn.tə/
der Richter|thẩm phán|A2|/ˈʁɪç.tɐ/
die Richtung|hướng|A2|/ˈʁɪç.tʊŋ/
das Risiko|rủi ro|A2|/ˈʁiː.zi.ko/
der Roman|tiểu thuyết|A2|/ʁoˈmaːn/
die Römer|người La Mã|A2|/ˈʁøː.mɐ/
die Rose|hoa hồng|A2|/ˈʁoː.zə/
der Ruhm|danh vọng|A2|/ʁuːm/
die Sache|vật, việc|A2|/ˈza.xə/
der Saal|hội trường|A2|/zaːl/
die Sahne|kem tươi|A2|/ˈzaː.nə/
der Satz|câu|A2|/zat͡s/
sauer|chua|A2|/ˈzaʊ̯.ɐ/
die Schale|bát|A2|/ˈʃaː.lə/
der Schatten|bóng|A2|/ˈʃa.tən/
der Schauspieler|diễn viên|A2|/ˈʃaʊ̯.ʃpiː.lɐ/
scheiden|chia tay|A2|/ˈʃaɪ̯.dən/
der Schein|vẻ bề ngoài|A2|/ʃaɪ̯n/
der Schmerz|nỗi đau|A2|/ʃmɛʁt͡s/
der Schmuck|trang sức|A2|/ʃmʊk/
der Schnaps|rượu mạnh|A2|/ʃnaps/
die Schnecke|ốc sên|A2|/ˈʃnɛ.kə/
schneiden|cắt|A2|/ˈʃnaɪ̯.dən/
der Schnupfen|cảm lạnh|A2|/ˈʃnʊ.pfən/
die Schokolade|sô cô la|A2|/ʃo.koˈlaː.də/
der Schreck|nỗi sợ|A2|/ʃʁɛk/
schütteln|lắc|A2|/ˈʃʏ.təln/
schützen|bảo vệ|A2|/ˈʃʏ.t͡sən/
die Schuld|lỗi|A2|/ʃʊlt/
die Schulter|vai|A2|/ˈʃʊl.tɐ/
der Schwamm|bọt biển|A2|/ʃvam/
schweigen|im lặng|A2|/ˈʃvaɪ̯.ɡən/
der Schweiß|mồ hôi|A2|/ʃvaɪ̯s/
das Schwert|thanh kiếm|A2|/ʃveːɐ̯t/
der See|hồ|A2|/zeː/
das Segel|cánh buồm|A2|/ˈzeː.ɡəl/
segnen|ban phước|A2|/ˈzeː.ɡnən/
die Seide|lụa|A2|/ˈzaɪ̯.də/
die Seife|xà phòng|A2|/ˈzaɪ̯.fə/
der Seemann|thủy thủ|A2|/ˈzeː.man/
die Sehenswürdigkeit|điểm tham quan|A2|/ˈzeː.əns.vʏʁ.dɪç.kaɪ̯t/
die Sehnsucht|nỗi nhớ|A2|/ˈzeːn.zʊxt/
seltsam|lạ lùng|A2|/ˈzɛlt.zaːm/
die Sendung|chương trình|A2|/ˈzɛn.dʊŋ/
der Sinn|ý nghĩa|A2|/zɪn/
die Sitte|phong tục|A2|/ˈzɪ.tə/
die Sitzung|buổi họp|A2|/ˈzɪ.t͡sʊŋ/
der Ski|ván trượt|A2|/ʃiː/
der Soldat|người lính|A2|/zɔlˈdaːt/
sondern|mà là|A2|/ˈzɔn.dɐn/
die Sorge|nỗi lo|A2|/ˈzɔʁ.ɡə/
die Sorte|loại|A2|/ˈzɔʁ.tə/
das Spiel|trò chơi|A2|/ʃpiːl/
die Spitze|đầu nhọn|A2|/ˈʃpɪ.t͡sə/
der Sport|thể thao|A2|/ʃpɔʁt/
die Spur|dấu vết|A2|/ʃpuːɐ̯/
der Staat|nhà nước|A2|/ʃtaːt/
der Stadtrand|ngoại ô|A2|/ˈʃtat.ʁant/
der Stand|vị trí|A2|/ʃtant/
die Station|trạm|A2|/ʃtaˈt͡si̯oːn/
die Statistik|thống kê|A2|/ʃtaˈtɪs.tɪk/
die Stelle|vị trí|A2|/ˈʃtɛ.lə/
der Stiefel|ủng|A2|/ˈʃtiː.fəl/
der Stil|phong cách|A2|/ʃtiːl/
der Stock|tầng|A2|/ʃtɔk/
der Stolz|niềm tự hào|A2|/ʃtɔlt͡s/
der Strand|bãi biển|A2|/ʃtʁant/
der Streit|cuộc cãi vã|A2|/ʃtʁaɪ̯t/
das Streichholz|que diêm|A2|/ˈʃtʁaɪ̯ç.hɔlt͡s/
der Strom|dòng điện|A2|/ʃtʁoːm/
die Strömung|dòng chảy|A2|/ˈʃtʁøː.mʊŋ/
die Strophe|khổ thơ|A2|/ˈʃtʁoː.fə/
der Stuhl|ghế|A2|/ʃtuːl/
der Sturm|cơn bão|A2|/ʃtʊʁm/
die Stütze|sự hỗ trợ|A2|/ˈʃtʏ.t͡sə/
die Summe|tổng|A2|/ˈzʊ.mə/
der Supermarkt|siêu thị|A2|/ˈzuː.pɐ.maʁkt/
die Suppe|súp|A2|/ˈzʊ.pə/
die Süßigkeit|đồ ngọt|A2|/ˈzyː.sɪç.kaɪ̯t/
die Tablette|viên thuốc|A2|/taˈblɛ.tə/
der Tabak|thuốc lá|A2|/ˈta.bak/
das Tablett|cái khay|A2|/taˈblɛt/
die Tageszeitung|báo hàng ngày|A2|/ˈtaː.ɡəs.t͡saɪ̯.tʊŋ/
der Tanz|điệu nhảy|A2|/tant͡s/
die Tapete|giấy dán tường|A2|/taˈpeː.tə/
tapfer|dũng cảm|A2|/ˈtap.fɐ/
die Tat|hành động|A2|/taːt/
die Tätigkeit|hoạt động|A2|/ˈtɛː.tɪç.kaɪ̯t/
das Taxi|taxi|A2|/ˈtak.si/
der Teppich|thảm|A2|/ˈtɛ.pɪç/
die Terrasse|sân thượng|A2|/tɛˈʁa.sə/
der Test|bài kiểm tra|A2|/tɛst/
der Text|văn bản|A2|/tɛkst/
das Theater|nhà hát|A2|/teˈaː.tɐ/
der Tipp|lời khuyên|A2|/tɪp/
der Titel|tiêu đề|A2|/ˈtiː.təl/
der Tod|cái chết|A2|/toːt/
der Ton|âm thanh|A2|/toːn/
die Torte|bánh kem|A2|/ˈtɔʁ.tə/
der Tourist|khách du lịch|A2|/tuˈʁɪst/
die Tradition|truyền thống|A2|/tʁa.diˈt͡si̯oːn/
der Traum|giấc mơ|A2|/tʁaʊ̯m/
die Trommel|trống|A2|/ˈtʁɔ.məl/
der Tropfen|giọt|A2|/ˈtʁɔ.pfən/
tropfen|nhỏ giọt|A2|/ˈtʁɔ.pfən/
überall|khắp nơi|A2|/yː.bɐˈʔal/
überlegen|suy nghĩ|A2|/ˌyː.bɐˈleː.ɡən/
übermorgen|ngày kia|A2|/ˈyː.bɐ.mɔʁ.ɡən/
übernachten|qua đêm|A2|/yː.bɐˈnax.tən/
übernehmen|đảm nhận|A2|/yː.bɐˈneː.mən/
überraschen|làm ngạc nhiên|A2|/yː.bɐˈʁa.ʃən/
übersetzen|dịch|A2|/ˌyː.bɐˈzɛ.t͡sən/
übertreiben|phóng đại|A2|/yː.bɐˈtʁaɪ̯.bən/
übrigens|nhân tiện|A2|/ˈyː.bʁɪ.ɡəns/
umarmen|ôm|A2|/ʊmˈʔaʁ.mən/
umsteigen|chuyển tàu|A2|/ˈʊm.ʃtaɪ̯.ɡən/
umziehen|chuyển nhà|A2|/ˈʊm.t͡siː.ən/
unheimlich|kỳ lạ|A2|/ʊnˈhaɪ̯m.lɪç/
unterhalten|giải trí|A2|/ʊn.tɐˈhal.tən/
die Unterhaltung|cuộc trò chuyện|A2|/ʊn.tɐˈhal.tʊŋ/
unterrichten|giảng dạy|A2|/ʊn.tɐˈʁɪç.tən/
unterscheiden|phân biệt|A2|/ʊn.tɐˈʃaɪ̯.dən/
unterschreiben|ký tên|A2|/ʊn.tɐˈʃʁaɪ̯.bən/
die Unterschrift|chữ ký|A2|/ˈʊn.tɐ.ʃʁɪft/
unterwegs|trên đường|A2|/ʊn.tɐˈveːks/
die Ursache|nguyên nhân|A2|/ˈuːɐ̯.za.xə/
der Verband|băng gạc|A2|/fɛɐ̯ˈbant/
verbieten|cấm|A2|/fɛɐ̯ˈbiː.tən/
verbinden|kết nối|A2|/fɛɐ̯ˈbɪn.dən/
verdienen|kiếm tiền|A2|/fɛɐ̯ˈdiː.nən/
der Verein|câu lạc bộ|A2|/fɛɐ̯ˈʔaɪ̯n/
vergangen|đã qua|A2|/fɛɐ̯ˈɡa.ŋən/
vergleichen|so sánh|A2|/fɛɐ̯ˈɡlaɪ̯.çən/
das Verhältnis|mối quan hệ|A2|/fɛɐ̯ˈhɛlt.nɪs/
verlassen|rời bỏ|A2|/fɛɐ̯ˈla.sən/
verletzen|làm bị thương|A2|/fɛɐ̯ˈlɛ.t͡sən/
der Verlust|sự mất mát|A2|/fɛɐ̯ˈlʊst/
die Vermietung|cho thuê|A2|/fɛɐ̯ˈmiː.tʊŋ/
verpassen|bỏ lỡ|A2|/fɛɐ̯ˈpa.sən/
die Vernunft|lý trí|A2|/fɛɐ̯ˈnʊnft/
die Versicherung|bảo hiểm|A2|/fɛɐ̯ˈzɪ.çə.ʁʊŋ/
die Verspätung|sự trễ|A2|/fɛɐ̯ˈʃpɛː.tʊŋ/
versuchen|thử|A2|/fɛɐ̯ˈzuː.xən/
der Vertrag|hợp đồng|A2|/fɛɐ̯ˈtʁaːk/
vertrauen|tin tưởng|A2|/fɛɐ̯ˈtʁaʊ̯.ən/
verwenden|sử dụng|A2|/fɛɐ̯ˈvɛn.dən/
der Verwandte|họ hàng|A2|/fɛɐ̯ˈvant.tə/
das Viertel|một phần tư|A2|/ˈfɪʁ.təl/
der Vokal|nguyên âm|A2|/voˈkaːl/
vorbei|qua|A2|/foːɐ̯ˈbaɪ̯/
das Vorbild|hình mẫu|A2|/ˈfoːɐ̯.bɪlt/
vorher|trước đó|A2|/foːɐ̯ˈheːɐ̯/
der Vorschlag|đề xuất|A2|/ˈfoːɐ̯.ʃlaːk/
vorsichtig|cẩn thận|A2|/ˈfoːɐ̯.zɪç.tɪç/
die Vorschrift|quy định|A2|/ˈfoːɐ̯.ʃʁɪft/
die Vorstellung|buổi biểu diễn|A2|/ˈfoːɐ̯.ʃtɛ.lʊŋ/
der Vorteil|lợi thế|A2|/ˈfoːɐ̯.taɪ̯l/
vorstellen|giới thiệu|A2|/ˈfoːɐ̯.ʃtɛ.lən/
die Waffe|vũ khí|A2|/ˈva.fə/
während|trong khi|A2|/ˈvɛː.ʁənt/
der Wald|rừng|A2|/valt/
die Wanderung|chuyến đi bộ|A2|/ˈvan.də.ʁʊŋ/
die Ware|hàng hóa|A2|/ˈvaː.ʁə/`;

const V_RAW = `sein|war|ist gewesen|thì, là, ở
haben|hatte|hat gehabt|có
werden|wurde|ist geworden|trở thành
können|konnte|hat gekonnt|có thể
müssen|musste|hat gemusst|phải
dürfen|durfte|hat gedurft|được phép
sollen|sollte|hat gesollt|nên
wollen|wollte|hat gewollt|muốn
mögen|mochte|hat gemocht|thích
denken|dachte|hat gedacht|nghĩ
bringen|brachte|hat gebracht|mang đến
kennen|kannte|hat gekannt|biết, quen
wissen|wusste|hat gewusst|biết
nennen|nannte|hat genannt|gọi tên
rennen|rannte|ist gerannt|chạy
brennen|brannte|hat gebrannt|cháy
senden|sandte|hat gesandt|gửi
verbringen|verbrachte|hat verbracht|trải qua
helfen|half|hat geholfen|giúp đỡ
nehmen|nahm|hat genommen|lấy, cầm
stehlen|stahl|hat gestohlen|ăn cắp
gelten|galt|hat gegolten|có giá trị
versprechen|versprach|hat versprochen|hứa
bleiben|blieb|ist geblieben|ở lại
schreiben|schrieb|hat geschrieben|viết
scheinen|schien|hat geschienen|chiếu sáng
steigen|stieg|ist gestiegen|leo, tăng
treiben|trieb|hat getrieben|thúc đẩy
schweigen|schwieg|hat geschwiegen|im lặng
leihen|lieh|hat geliehen|cho mượn
entscheiden|entschied|hat entschieden|quyết định
fliegen|flog|hat/ist geflogen|bay
riechen|roch|hat gerochen|ngửi
schließen|schloss|hat geschlossen|đóng
verlieren|verlor|hat verloren|mất, thua
ziehen|zog|hat/ist gezogen|kéo; chuyển
bieten|bot|hat geboten|đề nghị
frieren|fror|hat/ist gefroren|thấy lạnh
genießen|genoss|hat genossen|thưởng thức
gießen|goss|hat gegossen|đổ, tưới
vergleichen|verglich|hat verglichen|so sánh
schneiden|schnitt|hat geschnitten|cắt
greifen|griff|hat gegriffen|nắm, chộp
pfeifen|pfiff|hat gepfiffen|huýt sáo
reiten|ritt|hat/ist geritten|cưỡi ngựa
streiten|stritt|hat gestritten|cãi nhau
finden|fand|hat gefunden|tìm thấy
singen|sang|hat gesungen|hát
trinken|trank|hat getrunken|uống
springen|sprang|ist gesprungen|nhảy
binden|band|hat gebunden|buộc
sinken|sank|ist gesunken|chìm
verschwinden|verschwand|ist verschwunden|biến mất
zwingen|zwang|hat gezwungen|ép buộc
gelingen|gelang|ist gelungen|thành công
klingen|klang|hat geklungen|vang lên
stinken|stank|hat gestunken|bốc mùi
schlafen|schlief|hat geschlafen|ngủ
halten|hielt|hat gehalten|giữ
lassen|ließ|hat gelassen|để, cho phép
fallen|fiel|ist gefallen|ngã, rơi
fangen|fing|hat gefangen|bắt
braten|briet|hat gebraten|chiên
blasen|blies|hat geblasen|thổi
raten|riet|hat geraten|khuyên
verlassen|verließ|hat verlassen|rời bỏ
gefallen|gefiel|hat gefallen|làm hài lòng
anfangen|fing an|hat angefangen|bắt đầu
laufen|lief|ist gelaufen|chạy
essen|aß|hat gegessen|ăn
geben|gab|hat gegeben|đưa, cho
lesen|las|hat gelesen|đọc
sehen|sah|hat gesehen|nhìn
vergessen|vergaß|hat vergessen|quên
geschehen|geschah|ist geschehen|xảy ra
messen|maß|hat gemessen|đo
treten|trat|hat/ist getreten|đá; bước
fahren|fuhr|hat/ist gefahren|lái xe; đi
tragen|trug|hat getragen|mang, mặc
waschen|wusch|hat gewaschen|rửa, giặt
wachsen|wuchs|ist gewachsen|mọc
schlagen|schlug|hat geschlagen|đánh
erfahren|erfuhr|hat erfahren|biết được
graben|grub|hat gegraben|đào
lügen|log|hat gelogen|nói dối
heben|hob|hat gehoben|nâng
schwören|schwor|hat geschworen|thề
beginnen|begann|hat begonnen|bắt đầu
schwimmen|schwamm|ist geschwommen|bơi
gewinnen|gewann|hat gewonnen|thắng
gehen|ging|ist gegangen|đi bộ
kommen|kam|ist gekommen|đến
heißen|hieß|hat geheißen|tên là
stehen|stand|hat gestanden|đứng
rufen|rief|hat gerufen|gọi
tun|tat|hat getan|làm
sitzen|saß|hat gesessen|ngồi
liegen|lag|hat gelegen|nằm
bitten|bat|hat gebeten|nhờ, xin
backen|backte|hat gebacken|nướng
stoßen|stieß|hat/ist gestoßen|đẩy
entstehen|entstand|ist entstanden|hình thành
anbieten|bot an|hat angeboten|đề nghị
ankommen|kam an|ist angekommen|đến nơi
anrufen|rief an|hat angerufen|gọi điện
ansehen|sah an|hat angesehen|nhìn
anziehen|zog an|hat angezogen|mặc vào
aufstehen|stand auf|ist aufgestanden|thức dậy
befehlen|befahl|hat befohlen|ra lệnh
behalten|behielt|hat behalten|giữ lại
beißen|biss|hat gebissen|cắn
bekommen|bekam|hat bekommen|nhận được
bergen|barg|hat geborgen|cứu
bestehen|bestand|hat bestanden|thi đỗ
betrügen|betrog|hat betrogen|lừa dối
biegen|bog|hat/ist gebogen|uốn; rẽ
dringen|drang|ist gedrungen|xuyên qua
empfehlen|empfahl|hat empfohlen|giới thiệu
enthalten|enthielt|hat enthalten|chứa
erkennen|erkannte|hat erkannt|nhận ra
erschrecken|erschrak|ist erschrocken|giật mình
erwägen|erwog|hat erwogen|cân nhắc
fressen|fraß|hat gefressen|ăn (động vật)
gedeihen|gedieh|ist gediehen|phát triển
gleiten|glitt|ist geglitten|trượt
hängen|hing|hat gehangen|treo
kneifen|kniff|hat gekniffen|véo
kriechen|kroch|ist gekrochen|bò
laden|lud|hat geladen|chất
leiden|litt|hat gelitten|chịu đựng
meiden|mied|hat gemieden|tránh
mitbringen|brachte mit|hat mitgebracht|mang theo
mitkommen|kam mit|ist mitgekommen|đi cùng
ringen|rang|hat gerungen|vật lộn
scheiden|schied|hat/ist geschieden|chia tay
schieben|schob|hat geschoben|đẩy
schießen|schoss|hat geschossen|bắn
schleichen|schlich|ist geschlichen|rón rén
schmelzen|schmolz|hat/ist geschmolzen|tan chảy
schwellen|schwoll|ist geschwollen|sưng lên
schwinden|schwand|ist geschwunden|biến mất
schwingen|schwang|hat geschwungen|vung
stechen|stach|hat gestochen|đâm, chích
sterben|starb|ist gestorben|chết
streichen|strich|hat gestrichen|sơn, xóa
verbieten|verbot|hat verboten|cấm
verbrennen|verbrannte|hat/ist verbrannt|đốt cháy
verzeihen|verzieh|hat verziehen|tha thứ
wenden|wandte|hat gewandt|quay, lật
werben|warb|hat geworben|quảng cáo
werfen|warf|hat geworfen|ném
wiegen|wog|hat gewogen|cân`;

// Parse dữ liệu
window.FLAT_VOCAB = W_RAW.trim().split('\n').map((line, i) => {
    let [de, vi, level, ipa] = line.split('|');
    return { id: i, de: de.trim(), vi: vi.trim(), level: level ? level.trim() : '', ipa: ipa ? ipa.trim() : '' };
}).filter(x => x.de);

window.IRREGULAR_VERBS = V_RAW.trim().split('\n').map((line, i) => {
    let [inf, prat, perf, vi] = line.split('|');
    return { id: i, inf, prat, perf, vi };
});
