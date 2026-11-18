<p align="center">
  <img src="../assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#giới-thiệu">Giới thiệu</a> |
  <a href="#báo-lỗi">Báo lỗi</a> |
  <a href="#dành-cho-nhà-phát-triển">Dành cho nhà phát triển</a><br>
  [<a href="../README.md">English</a>] | [<a href="README-KR.md">한국어</a>] | [<a href="README-JP.md">日本語</a>] | [<a href="README-ZH.md">简体中文</a>] | [<a href="README-TW.md">繁體中文</a>] | [<a href="README-ES.md">Español</a>] | [<a href="README-PTBR.md">Português (Brasil)</a>] | [<a href="README-FR.md">Français</a>] | [<a href="README-DE.md">Deutsch</a>] | [<a href="README-IT.md">Italiano</a>] | [<a href="README-RU.md">Русский</a>] | [<a href="README-PL.md">Polski</a>] | [<a href="README-TR.md">Türkçe</a>] | [<a href="README-ID.md">Bahasa Indonesia</a>] | [<a href="README-VN.md">Tiếng Việt</a>] | [<a href="README-TH.md">ไทย</a>] | [<a href="README-AR.md">العربية</a>] | [<a href="README-HI.md">हिन्दी</a>]
</p>

# Nunmasae Companion

Ứng dụng đồng hành không chính thức, không tiết lộ nội dung (spoiler), do người hâm mộ làm cho tiểu thuyết giả tưởng Hàn Quốc "The Bird That Drinks Tears" (눈물을 마시는 새). Ứng dụng chỉ hiển thị nhân vật, địa danh và thuật ngữ tính đến tập bạn đã đọc.

> [!NOTE]
> Giao diện ứng dụng chỉ có tiếng Anh và tiếng Hàn. README này được dịch máy bằng Claude; rất hoan nghênh mọi góp ý chỉnh sửa.

## Giới thiệu

- Chọn bạn đã đọc đến đâu (từ Tập 1 đến Tập 4). Ứng dụng chỉ hiển thị nhân vật, chủng tộc, địa danh và thuật ngữ đã xuất hiện tính đến lúc đó, và trong mỗi mục cũng chỉ hiển thị những sự thật đã được hé lộ tính đến lúc đó.
- Các mục và sự thật thuộc những tập bạn chưa đọc không bị làm mờ mà hoàn toàn không được hiển thị, nên ngay cả số lượng của chúng cũng được giữ kín.
- Những bước ngoặt lớn trong tập bạn đang đọc sẽ được che lại trên màn hình chi tiết cho đến khi bạn chạm vào.
- Giao diện tiếng Anh và tiếng Hàn. Màn hình tiếng Anh cũng hiển thị tên tiếng Hàn để bạn đối chiếu với nguyên tác.
- Không quảng cáo, không quyên góp, không tính năng trả phí, không đăng nhập, không máy chủ. Thứ duy nhất được lưu trên thiết bị của bạn là tiến độ đọc và ngôn ngữ bạn chọn.
- Tải về: Google Play (Sắp ra mắt)

## Báo lỗi

Các sự thật được tóm tắt từ nguồn thứ cấp chứ không phải từ chính bộ sách, nên có thể có chỗ sai hoặc bị xếp nhầm tập. Hãy cho chúng tôi biết, chúng tôi sẽ sửa.

- Trong ứng dụng: "Settings" (Cài đặt) > "Report on GitHub" (Báo cáo trên GitHub) hoặc "Report by email" (Báo cáo qua email)
- [Mở một issue trên GitHub](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose) và chọn biểu mẫu: sai thông tin / hé lộ quá sớm (spoiler) / tên tiếng Anh
- Tự sửa và gửi pull request: [CONTRIBUTING.md](CONTRIBUTING.md)

**Cảnh báo spoiler**: nếu tiêu đề hoặc nội dung issue của bạn có thể tiết lộ nội dung cho những độc giả chưa đọc xong, hãy ghi `[Spoiler Book N]` ở dòng đầu tiên.

## Không chính thức

Đây là dự án của người hâm mộ, không liên kết với tác giả, các nhà xuất bản (Golden Bough, HarperCollins) hay Krafton. Tên gọi, bối cảnh và thuật ngữ thuộc về nguyên tác; mọi câu mô tả sự thật trong ứng dụng đều là bản tóm tắt tự viết. Không trích dẫn từ sách, không dùng bìa sách, không dùng tranh minh họa. Nếu chủ sở hữu bản quyền yêu cầu, chúng tôi sẽ gỡ xuống ngay.

## Dành cho nhà phát triển

- Hướng dẫn đóng góp (tiếng Anh): [CONTRIBUTING.md](CONTRIBUTING.md)
- Tài liệu dành cho nhà phát triển (màn hình, cấu trúc mã, định dạng dữ liệu, lệnh; chỉ có tiếng Hàn): [DEVELOPMENT.md](DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. Trình quản lý gói là pnpm.

## Giấy phép

Mã nguồn: xem `LICENSE`. Tên nhân vật, địa danh và thuật ngữ thuộc về nguyên tác; mọi câu mô tả sự thật trong `entries.json` đều là bản tóm tắt tự viết dành riêng cho ứng dụng này.
