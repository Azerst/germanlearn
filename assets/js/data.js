/* =========================================================
   Static Content — Từ vựng + Ngữ pháp
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
    { de: 'die Mutter', vi: 'mẹ', ipa: '[ˈmʊtɐ]', ex: 'Meine Mutter kocht gut.', exVi: 'Mẹ tôi nấu ăn giỏi.' },
    { de: 'der Bruder', vi: 'anh/em trai', ipa: '[ˈbʁuːdɐ]', ex: 'Ich habe einen Bruder.', exVi: 'Tôi có một anh trai.' },
    { de: 'die Schwester', vi: 'chị/em gái', ipa: '[ˈʃvɛstɐ]', ex: 'Meine Schwester lernt Deutsch.', exVi: 'Chị tôi học tiếng Đức.' },
    { de: 'das Kind', vi: 'đứa trẻ', ipa: '[kɪnt]', ex: 'Das Kind spielt im Garten.', exVi: 'Đứa trẻ chơi trong vườn.' },
    { de: 'der Sohn', vi: 'con trai', ipa: '[zoːn]', ex: 'Ihr Sohn ist zehn.', exVi: 'Con trai cô ấy 10 tuổi.' },
    { de: 'die Tochter', vi: 'con gái', ipa: '[ˈtɔxtɐ]', ex: 'Meine Tochter geht zur Schule.', exVi: 'Con gái tôi đi học.' },
    { de: 'der Großvater', vi: 'ông', ipa: '[ˈɡʁoːsfaːtɐ]', ex: 'Mein Großvater ist 80.', exVi: 'Ông tôi 80 tuổi.' },
    { de: 'die Großmutter', vi: 'bà', ipa: '[ˈɡʁoːsmʊtɐ]', ex: 'Meine Großmutter backt Kuchen.', exVi: 'Bà tôi nướng bánh.' },
    { de: 'die Eltern', vi: 'bố mẹ', ipa: '[ˈɛltɐn]', ex: 'Meine Eltern wohnen in Berlin.', exVi: 'Bố mẹ tôi sống ở Berlin.' },
    { de: 'die Geschwister', vi: 'anh chị em', ipa: '[ɡəˈʃvɪstɐ]', ex: 'Ich habe drei Geschwister.', exVi: 'Tôi có ba anh chị em.' }
  ],
  'Trường học': [
    { de: 'die Schule', vi: 'trường học', ipa: '[ˈʃuːlə]', ex: 'Ich gehe zur Schule.', exVi: 'Tôi đi học.' },
    { de: 'der Lehrer', vi: 'giáo viên nam', ipa: '[ˈleːʁɐ]', ex: 'Der Lehrer erklärt die Grammatik.', exVi: 'Thầy giải thích ngữ pháp.' },
    { de: 'die Lehrerin', vi: 'giáo viên nữ', ipa: '[ˈleːʁəʁɪn]', ex: 'Die Lehrerin ist nett.', exVi: 'Cô giáo tốt bụng.' },
    { de: 'der Student', vi: 'sinh viên nam', ipa: '[ʃtuˈdɛnt]', ex: 'Der Student lernt Medizin.', exVi: 'Sinh viên học y.' },
    { de: 'das Buch', vi: 'cuốn sách', ipa: '[buːx]', ex: 'Das Buch ist interessant.', exVi: 'Cuốn sách thú vị.' },
    { de: 'das Heft', vi: 'vở', ipa: '[hɛft]', ex: 'Ich schreibe im Heft.', exVi: 'Tôi viết vào vở.' },
    { de: 'der Stift', vi: 'bút', ipa: '[ʃtɪft]', ex: 'Ich brauche einen Stift.', exVi: 'Tôi cần một cây bút.' },
    { de: 'die Hausaufgabe', vi: 'bài tập về nhà', ipa: '[ˈhaʊ̯sʔaʊ̯fˌɡaːbə]', ex: 'Ich mache Hausaufgaben.', exVi: 'Tôi làm bài tập.' },
    { de: 'die Prüfung', vi: 'bài kiểm tra', ipa: '[ˈpʁyːfʊŋ]', ex: 'Die Prüfung ist morgen.', exVi: 'Bài kiểm tra là ngày mai.' },
    { de: 'die Note', vi: 'điểm số', ipa: '[ˈnoːtə]', ex: 'Ich habe eine gute Note.', exVi: 'Tôi được điểm tốt.' },
    { de: 'das Klassenzimmer', vi: 'phòng học', ipa: '[ˈklasn̩ˌt͡sɪmɐ]', ex: 'Das Klassenzimmer ist groß.', exVi: 'Phòng học rộng.' },
    { de: 'die Universität', vi: 'trường đại học', ipa: '[univɛʁziˈtɛːt]', ex: 'Sie studiert an der Uni.', exVi: 'Cô ấy học đại học.' }
  ],
  'Công việc': [
    { de: 'die Arbeit', vi: 'công việc', ipa: '[ˈaʁbaɪ̯t]', ex: 'Meine Arbeit macht Spaß.', exVi: 'Công việc tôi vui.' },
    { de: 'der Beruf', vi: 'nghề nghiệp', ipa: '[bəˈʁuːf]', ex: 'Was ist Ihr Beruf?', exVi: 'Nghề của bạn là gì?' },
    { de: 'das Büro', vi: 'văn phòng', ipa: '[byˈʁoː]', ex: 'Ich arbeite im Büro.', exVi: 'Tôi làm ở văn phòng.' },
    { de: 'der Kollege', vi: 'đồng nghiệp nam', ipa: '[kɔˈleːɡə]', ex: 'Mein Kollege ist nett.', exVi: 'Đồng nghiệp tôi tốt.' },
    { de: 'der Chef', vi: 'sếp', ipa: '[ʃɛf]', ex: 'Mein Chef ist im Urlaub.', exVi: 'Sếp tôi đi nghỉ.' },
    { de: 'das Gehalt', vi: 'tiền lương', ipa: '[ɡəˈhalt]', ex: 'Das Gehalt ist gut.', exVi: 'Lương tốt.' },
    { de: 'der Termin', vi: 'cuộc hẹn', ipa: '[tɛʁˈmiːn]', ex: 'Ich habe einen Termin.', exVi: 'Tôi có cuộc hẹn.' },
    { de: 'das Meeting', vi: 'cuộc họp', ipa: '[ˈmiːtɪŋ]', ex: 'Das Meeting dauert zwei Stunden.', exVi: 'Họp kéo dài 2 giờ.' },
    { de: 'die Bewerbung', vi: 'đơn xin việc', ipa: '[bəˈvɛʁbʊŋ]', ex: 'Ich schreibe eine Bewerbung.', exVi: 'Tôi viết đơn xin việc.' },
    { de: 'der Vertrag', vi: 'hợp đồng', ipa: '[fɛɐ̯ˈtʁaːk]', ex: 'Ich habe den Vertrag unterschrieben.', exVi: 'Tôi đã ký hợp đồng.' },
    { de: 'die Firma', vi: 'công ty', ipa: '[ˈfɪʁma]', ex: 'Die Firma ist international.', exVi: 'Công ty quốc tế.' },
    { de: 'der Arzt', vi: 'bác sĩ', ipa: '[aːɐ̯t͡st]', ex: 'Der Arzt arbeitet im Krankenhaus.', exVi: 'Bác sĩ làm ở bệnh viện.' }
  ],
  'Mua sắm': [
    { de: 'das Geschäft', vi: 'cửa hàng', ipa: '[ɡəˈʃɛft]', ex: 'Das Geschäft ist zu.', exVi: 'Cửa hàng đóng cửa.' },
    { de: 'der Supermarkt', vi: 'siêu thị', ipa: '[ˈzuːpɐˌmaʁkt]', ex: 'Ich gehe in den Supermarkt.', exVi: 'Tôi đi siêu thị.' },
    { de: 'der Preis', vi: 'giá cả', ipa: '[pʁaɪ̯s]', ex: 'Der Preis ist hoch.', exVi: 'Giá cao.' },
    { de: 'das Geld', vi: 'tiền', ipa: '[ɡɛlt]', ex: 'Ich habe kein Geld.', exVi: 'Tôi không có tiền.' },
    { de: 'die Kasse', vi: 'quầy thu ngân', ipa: '[ˈkasə]', ex: 'Zahlen Sie an der Kasse.', exVi: 'Thanh toán ở quầy.' },
    { de: 'der Rabatt', vi: 'giảm giá', ipa: '[ʁaˈbat]', ex: 'Gibt es einen Rabatt?', exVi: 'Có giảm giá không?' },
    { de: 'bezahlen', vi: 'thanh toán', ipa: '[bəˈt͡saːlən]', ex: 'Ich möchte bezahlen.', exVi: 'Tôi muốn thanh toán.' },
    { de: 'kaufen', vi: 'mua', ipa: '[ˈkaʊ̯fn̩]', ex: 'Ich kaufe ein Auto.', exVi: 'Tôi mua ô tô.' },
    { de: 'verkaufen', vi: 'bán', ipa: '[fɛɐ̯ˈkaʊ̯fn̩]', ex: 'Sie verkauft ihr Handy.', exVi: 'Cô ấy bán điện thoại.' },
    { de: 'die Quittung', vi: 'hóa đơn', ipa: '[ˈkvɪtʊŋ]', ex: 'Kann ich die Quittung bekommen?', exVi: 'Cho tôi hóa đơn?' },
    { de: 'teuer', vi: 'đắt', ipa: '[ˈtɔɪ̯ɐ]', ex: 'Das ist zu teuer.', exVi: 'Đắt quá.' },
    { de: 'günstig', vi: 'rẻ', ipa: '[ˈɡʏnstɪç]', ex: 'Das ist günstig.', exVi: 'Cái này rẻ.' }
  ],
  'Du lịch': [
    { de: 'die Reise', vi: 'chuyến đi', ipa: '[ˈʁaɪ̯zə]', ex: 'Die Reise war schön.', exVi: 'Chuyến đi đẹp.' },
    { de: 'der Bahnhof', vi: 'nhà ga', ipa: '[ˈbaːnhoːf]', ex: 'Der Bahnhof ist im Zentrum.', exVi: 'Nhà ga ở trung tâm.' },
    { de: 'der Flughafen', vi: 'sân bay', ipa: '[ˈfluːkhaːfn̩]', ex: 'Der Flughafen ist weit.', exVi: 'Sân bay xa.' },
    { de: 'der Zug', vi: 'tàu hỏa', ipa: '[t͡suːk]', ex: 'Der Zug fährt um 8 Uhr.', exVi: 'Tàu chạy lúc 8 giờ.' },
    { de: 'die Fahrkarte', vi: 'vé', ipa: '[ˈfaːɐ̯ˌkaʁtə]', ex: 'Ich kaufe eine Fahrkarte.', exVi: 'Tôi mua vé.' },
    { de: 'das Hotel', vi: 'khách sạn', ipa: '[hoˈtɛl]', ex: 'Wir wohnen im Hotel.', exVi: 'Chúng tôi ở khách sạn.' },
    { de: 'das Zimmer', vi: 'phòng', ipa: '[ˈt͡sɪmɐ]', ex: 'Das Zimmer ist sauber.', exVi: 'Phòng sạch.' },
    { de: 'der Koffer', vi: 'va li', ipa: '[ˈkɔfɐ]', ex: 'Mein Koffer ist schwer.', exVi: 'Va li tôi nặng.' },
    { de: 'der Pass', vi: 'hộ chiếu', ipa: '[pas]', ex: 'Vergessen Sie den Pass nicht!', exVi: 'Đừng quên hộ chiếu!' },
    { de: 'der Urlaub', vi: 'kỳ nghỉ', ipa: '[ˈuːɐ̯laʊ̯p]', ex: 'Im Urlaub fahre ich ans Meer.', exVi: 'Kỳ nghỉ tôi đi biển.' },
    { de: 'buchen', vi: 'đặt chỗ', ipa: '[ˈbuːxn̩]', ex: 'Ich buche ein Hotel.', exVi: 'Tôi đặt khách sạn.' },
    { de: 'der Strand', vi: 'bãi biển', ipa: '[ʃtʁant]', ex: 'Der Strand ist schön.', exVi: 'Bãi biển đẹp.' }
  ],
  'Sức khỏe': [
    { de: 'die Gesundheit', vi: 'sức khỏe', ipa: '[ɡəˈzʊnthaɪ̯t]', ex: 'Gesundheit ist wichtig.', exVi: 'Sức khỏe quan trọng.' },
    { de: 'der Arzt', vi: 'bác sĩ', ipa: '[aːɐ̯t͡st]', ex: 'Ich gehe zum Arzt.', exVi: 'Tôi đi khám.' },
    { de: 'das Krankenhaus', vi: 'bệnh viện', ipa: '[ˈkʁaŋkn̩ˌhaʊ̯s]', ex: 'Das Krankenhaus ist modern.', exVi: 'Bệnh viện hiện đại.' },
    { de: 'die Medizin', vi: 'thuốc', ipa: '[mediˈt͡siːn]', ex: 'Nehmen Sie die Medizin.', exVi: 'Uống thuốc.' },
    { de: 'der Schmerz', vi: 'cơn đau', ipa: '[ʃmɛʁt͡s]', ex: 'Ich habe Schmerzen.', exVi: 'Tôi bị đau.' },
    { de: 'die Kopfschmerzen', vi: 'đau đầu', ipa: '[ˈkɔp͡fˌʃmɛʁt͡sn̩]', ex: 'Ich habe Kopfschmerzen.', exVi: 'Tôi đau đầu.' },
    { de: 'die Apotheke', vi: 'hiệu thuốc', ipa: '[apoˈteːkə]', ex: 'Die Apotheke ist nebenan.', exVi: 'Hiệu thuốc bên cạnh.' },
    { de: 'krank', vi: 'ốm', ipa: '[kʁaŋk]', ex: 'Ich bin krank.', exVi: 'Tôi bị ốm.' },
    { de: 'gesund', vi: 'khỏe mạnh', ipa: '[ɡəˈzʊnt]', ex: 'Obst ist gesund.', exVi: 'Trái cây tốt.' },
    { de: 'das Fieber', vi: 'sốt', ipa: '[ˈfiːbɐ]', ex: 'Er hat Fieber.', exVi: 'Anh ấy bị sốt.' },
    { de: 'die Erkältung', vi: 'cảm lạnh', ipa: '[ɛɐ̯ˈkɛltʊŋ]', ex: 'Ich habe eine Erkältung.', exVi: 'Tôi bị cảm.' },
    { de: 'die Tablette', vi: 'viên thuốc', ipa: '[taˈblɛtə]', ex: 'Nehmen Sie eine Tablette.', exVi: 'Uống một viên.' }
  ],
  'Thực phẩm': [
    { de: 'das Essen', vi: 'thức ăn', ipa: '[ˈɛsn̩]', ex: 'Das Essen ist lecker.', exVi: 'Món ăn ngon.' },
    { de: 'das Frühstück', vi: 'bữa sáng', ipa: '[ˈfʁyːʃtʏk]', ex: 'Ich esse Frühstück um 7.', exVi: 'Tôi ăn sáng lúc 7 giờ.' },
    { de: 'das Brot', vi: 'bánh mì', ipa: '[bʁoːt]', ex: 'Brot ist lecker.', exVi: 'Bánh mì ngon.' },
    { de: 'der Reis', vi: 'cơm', ipa: '[ʁaɪ̯s]', ex: 'Ich esse Reis.', exVi: 'Tôi ăn cơm.' },
    { de: 'das Fleisch', vi: 'thịt', ipa: '[flaɪ̯ʃ]', ex: 'Ich esse kein Fleisch.', exVi: 'Tôi không ăn thịt.' },
    { de: 'der Fisch', vi: 'cá', ipa: '[fɪʃ]', ex: 'Freitags esse ich Fisch.', exVi: 'Thứ Sáu tôi ăn cá.' },
    { de: 'das Obst', vi: 'trái cây', ipa: '[oːpst]', ex: 'Obst ist gesund.', exVi: 'Trái cây tốt.' },
    { de: 'das Gemüse', vi: 'rau', ipa: '[ɡəˈmyːzə]', ex: 'Ich esse viel Gemüse.', exVi: 'Tôi ăn nhiều rau.' },
    { de: 'der Apfel', vi: 'táo', ipa: '[ˈap͡fl̩]', ex: 'Ein Apfel am Tag.', exVi: 'Một quả táo mỗi ngày.' },
    { de: 'die Milch', vi: 'sữa', ipa: '[mɪlç]', ex: 'Ich trinke Milch.', exVi: 'Tôi uống sữa.' },
    { de: 'der Käse', vi: 'phô mai', ipa: '[ˈkɛːzə]', ex: 'Deutscher Käse ist berühmt.', exVi: 'Phô mai Đức nổi tiếng.' },
    { de: 'das Wasser', vi: 'nước', ipa: '[ˈvasɐ]', ex: 'Ich trinke Wasser.', exVi: 'Tôi uống nước.' }
  ],
  'Nhà cửa': [
    { de: 'das Haus', vi: 'nhà', ipa: '[haʊ̯s]', ex: 'Das Haus ist groß.', exVi: 'Ngôi nhà rộng.' },
    { de: 'die Wohnung', vi: 'căn hộ', ipa: '[ˈvoːnʊŋ]', ex: 'Die Wohnung ist schön.', exVi: 'Căn hộ đẹp.' },
    { de: 'das Schlafzimmer', vi: 'phòng ngủ', ipa: '[ˈʃlaːfˌt͡sɪmɐ]', ex: 'Das Schlafzimmer ist ruhig.', exVi: 'Phòng ngủ yên tĩnh.' },
    { de: 'das Wohnzimmer', vi: 'phòng khách', ipa: '[ˈvoːnˌt͡sɪmɐ]', ex: 'Wir sitzen im Wohnzimmer.', exVi: 'Chúng tôi ngồi phòng khách.' },
    { de: 'die Küche', vi: 'nhà bếp', ipa: '[ˈkʏçə]', ex: 'Die Küche ist modern.', exVi: 'Bếp hiện đại.' },
    { de: 'das Badezimmer', vi: 'phòng tắm', ipa: '[ˈbaːdəˌt͡sɪmɐ]', ex: 'Das Bad ist sauber.', exVi: 'Phòng tắm sạch.' },
    { de: 'der Garten', vi: 'vườn', ipa: '[ˈɡaʁtn̩]', ex: 'Der Garten ist groß.', exVi: 'Khu vườn rộng.' },
    { de: 'die Tür', vi: 'cửa', ipa: '[tyːɐ̯]', ex: 'Schließen Sie die Tür.', exVi: 'Đóng cửa.' },
    { de: 'das Fenster', vi: 'cửa sổ', ipa: '[ˈfɛnstɐ]', ex: 'Öffne das Fenster.', exVi: 'Mở cửa sổ.' },
    { de: 'der Tisch', vi: 'bàn', ipa: '[tɪʃ]', ex: 'Der Tisch ist aus Holz.', exVi: 'Bàn bằng gỗ.' },
    { de: 'der Stuhl', vi: 'ghế', ipa: '[ʃtuːl]', ex: 'Der Stuhl ist bequem.', exVi: 'Ghế thoải mái.' },
    { de: 'das Bett', vi: 'giường', ipa: '[bɛt]', ex: 'Das Bett ist groß.', exVi: 'Giường rộng.' }
  ],
  'Quần áo': [
    { de: 'die Kleidung', vi: 'quần áo', ipa: '[ˈklaɪ̯dʊŋ]', ex: 'Ich brauche Kleidung.', exVi: 'Tôi cần quần áo.' },
    { de: 'das Hemd', vi: 'áo sơ mi', ipa: '[hɛmt]', ex: 'Das Hemd ist weiß.', exVi: 'Áo sơ mi trắng.' },
    { de: 'das T-Shirt', vi: 'áo thun', ipa: '[ˈtiːʃœʁt]', ex: 'Ich trage ein T-Shirt.', exVi: 'Tôi mặc áo thun.' },
    { de: 'die Hose', vi: 'quần dài', ipa: '[ˈhoːzə]', ex: 'Die Hose ist zu eng.', exVi: 'Quần chật quá.' },
    { de: 'die Jeans', vi: 'quần jeans', ipa: '[d͡ʒiːns]', ex: 'Ich trage Jeans.', exVi: 'Tôi mặc jeans.' },
    { de: 'das Kleid', vi: 'đầm', ipa: '[klaɪ̯t]', ex: 'Das Kleid ist elegant.', exVi: 'Đầm thanh lịch.' },
    { de: 'die Jacke', vi: 'áo khoác', ipa: '[ˈjakə]', ex: 'Die Jacke ist warm.', exVi: 'Áo khoác ấm.' },
    { de: 'der Pullover', vi: 'áo len', ipa: '[pʊˈloːvɐ]', ex: 'Im Winter trage ich Pullover.', exVi: 'Mùa đông mặc áo len.' },
    { de: 'die Schuhe', vi: 'giày', ipa: '[ˈʃuːə]', ex: 'Die Schuhe sind bequem.', exVi: 'Giày thoải mái.' },
    { de: 'die Socken', vi: 'tất', ipa: '[ˈzɔkn̩]', ex: 'Die Socken sind schwarz.', exVi: 'Tất màu đen.' },
    { de: 'die Tasche', vi: 'túi xách', ipa: '[ˈtaʃə]', ex: 'Die Tasche ist teuer.', exVi: 'Túi đắt.' },
    { de: 'die Brille', vi: 'kính', ipa: '[ˈbʁɪlə]', ex: 'Ich trage eine Brille.', exVi: 'Tôi đeo kính.' }
  ],
  'Thời gian': [
    { de: 'die Zeit', vi: 'thời gian', ipa: '[t͡saɪ̯t]', ex: 'Ich habe keine Zeit.', exVi: 'Tôi không có thời gian.' },
    { de: 'der Tag', vi: 'ngày', ipa: '[taːk]', ex: 'Der Tag war lang.', exVi: 'Ngày dài.' },
    { de: 'die Woche', vi: 'tuần', ipa: '[ˈvɔxə]', ex: 'Diese Woche bin ich bận.', exVi: 'Tuần này tôi bận.' },
    { de: 'der Monat', vi: 'tháng', ipa: '[ˈmoːnat]', ex: 'Der Monat ist vorbei.', exVi: 'Tháng đã qua.' },
    { de: 'das Jahr', vi: 'năm', ipa: '[jaːɐ̯]', ex: 'Ich lerne seit einem Jahr.', exVi: 'Tôi học được 1 năm.' },
    { de: 'heute', vi: 'hôm nay', ipa: '[ˈhɔɪ̯tə]', ex: 'Heute ist Montag.', exVi: 'Hôm nay thứ Hai.' },
    { de: 'morgen', vi: 'ngày mai', ipa: '[ˈmɔʁɡn̩]', ex: 'Morgen habe ich frei.', exVi: 'Mai tôi được nghỉ.' },
    { de: 'gestern', vi: 'hôm qua', ipa: '[ˈɡɛstɐn]', ex: 'Gestern war ich krank.', exVi: 'Hôm qua tôi ốm.' },
    { de: 'jetzt', vi: 'bây giờ', ipa: '[jɛt͡st]', ex: 'Jetzt esse ich.', exVi: 'Bây giờ tôi ăn.' },
    { de: 'der Morgen', vi: 'buổi sáng', ipa: '[ˈmɔʁɡn̩]', ex: 'Am Morgen trinke ich Kaffee.', exVi: 'Buổi sáng tôi uống cà phê.' },
    { de: 'der Abend', vi: 'buổi tối', ipa: '[ˈaːbn̩t]', ex: 'Am Abend sehe ich fern.', exVi: 'Tối tôi xem TV.' },
    { de: 'der Sommer', vi: 'mùa hè', ipa: '[ˈzɔmɐ]', ex: 'Im Sommer schwimme ich.', exVi: 'Mùa hè tôi bơi.' }
  ]
};

window.GRAMMAR = {
  prasens: {
    title: 'Präsens — Thì hiện tại', level: 'A1',
    content: `
      <p>Thì hiện tại dùng diễn tả hành động đang xảy ra, thói quen, sự thật hiển nhiên.</p>
      <h3>Cách chia động từ yếu</h3>
      <div class="example"><div class="de">lernen</div><div class="vi">ich lerne — du lernst — er/sie/es lernt — wir lernen — ihr lernt — sie lernen</div></div>
      <h3>Động từ mạnh</h3>
      <div class="example"><div class="de">sprechen</div><div class="vi">ich spreche — du sprichst — er spricht — wir sprechen — ihr sprecht — sie sprechen</div></div>
      <h3>sein / haben</h3>
      <div class="example"><div class="de">sein</div><div class="vi">ich bin — du bist — er ist — wir sind — ihr seid — sie sind</div></div>
      <div class="example"><div class="de">haben</div><div class="vi">ich habe — du hast — er hat — wir haben — ihr habt — sie haben</div></div>
    `
  },
  akkusativ: {
    title: 'Akkusativ — Cách 4', level: 'A1',
    content: `
      <p>Tân ngữ trực tiếp, trả lời Wen? (ai?) hoặc Was? (cái gì?).</p>
      <h3>Mạo từ</h3>
      <div class="example"><div class="de">der → den, die → die, das → das, die (pl) → die</div><div class="vi">Chỉ giống đực thay đổi</div></div>
      <h3>Ví dụ</h3>
      <div class="example"><div class="de">Ich sehe <strong>den</strong> Mann.</div><div class="vi">Tôi nhìn thấy người đàn ông.</div></div>
      <div class="example"><div class="de">Ich kaufe <strong>das</strong> Buch.</div><div class="vi">Tôi mua cuốn sách.</div></div>
    `
  },
  dativ: {
    title: 'Dativ — Cách 3', level: 'A2',
    content: `
      <p>Tân ngữ gián tiếp, trả lời Wem? (cho ai?).</p>
      <h3>Mạo từ</h3>
      <div class="example"><div class="de">der → dem, die → der, das → dem, die (pl) → den</div></div>
      <h3>Giới từ luôn dùng Dativ</h3>
      <div class="example"><div class="de">aus, bei, mit, nach, seit, von, zu</div></div>
      <h3>Ví dụ</h3>
      <div class="example"><div class="de">Ich helfe <strong>dem</strong> Mann.</div><div class="vi">Tôi giúp người đàn ông.</div></div>
    `
  },
  perfekt: {
    title: 'Perfekt — Thì hoàn thành', level: 'A2',
    content: `
      <p>Kể về hành động đã xảy ra (trong hội thoại).</p>
      <h3>Cấu trúc</h3>
      <div class="example"><div class="de">haben/sein + Partizip II</div></div>
      <h3>Ví dụ</h3>
      <div class="example"><div class="de">Ich <strong>habe</strong> Deutsch <strong>gelernt</strong>.</div><div class="vi">Tôi đã học tiếng Đức.</div></div>
      <div class="example"><div class="de">Er <strong>ist</strong> nach Berlin <strong>gefahren</strong>.</div><div class="vi">Anh ấy đã đi Berlin.</div></div>
    `
  },
  modalverben: {
    title: 'Modalverben — Động từ khuyết thiếu', level: 'A2',
    content: `
      <p>können (có thể), müssen (phải), wollen (muốn), sollen (nên), dürfen (được phép), mögen (thích).</p>
      <h3>Cấu trúc</h3>
      <div class="example"><div class="de">Modalverb (vị trí 2) + ... + Infinitiv (cuối)</div></div>
      <h3>Ví dụ</h3>
      <div class="example"><div class="de">Ich <strong>kann</strong> gut Deutsch <strong>sprechen</strong>.</div><div class="vi">Tôi có thể nói tiếng Đức tốt.</div></div>
      <div class="example"><div class="de">Du <strong>musst</strong> mehr <strong>lernen</strong>.</div><div class="vi">Bạn phải học nhiều hơn.</div></div>
    `
  }
};
