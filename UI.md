# DUKizz – UI Design Rules

> File rule UI cho toàn bộ web quiz **DUKizz**. Mọi component, trang và màn hình mới đều phải tuân theo file này.
> Style: **Bauhaus cân bằng** · Stack: **React + Tailwind CSS** · Chỉ **light mode** · UI **tiếng Việt**.
> Đối tượng: sinh viên và người học thuật → tông giọng vui vẻ nhưng rõ ràng, nghiêm túc, tập trung nội dung.

---

## 1. Nguyên tắc cốt lõi

1. **Hình học trước, trang trí sau.** Dùng hình tròn, vuông, tam giác làm khối chính; không dùng hình hữu cơ, blob, gradient mềm.
2. **Khối màu phẳng.** Chỉ dùng màu trong palette, không gradient, không opacity làm "ra màu mới".
3. **Viền đen + bóng cứng.** Mọi bề mặt tương tác (card, nút, input) có viền đen 2px và bóng offset cứng.
4. **Lưới rõ ràng, bất đối xứng có kiểm soát.** Bố cục theo lưới 8px; cho phép lệch/xếp chồng khối trang trí nhưng không được che nội dung.
5. **Chức năng dẫn đầu.** Quiz là công cụ học: nội dung câu hỏi, đáp án, kết quả luôn dễ đọc nhất; trang trí chỉ là phụ.
6. **Nhất quán.** Không tự thêm màu, font, bóng, bo góc ngoài các token bên dưới. Cần thứ mới → cập nhật file này trước.

---

## 2. Màu sắc

### 2.1 Palette gốc (4 màu + trung tính)

| Token   | Hex       | Vai trò                                                                |
| ------- | --------- | ---------------------------------------------------------------------- |
| `cream` | `#FEFBC7` | **Bề mặt**: dải nền phụ, nền card/drawer/modal, footer                      |                                         |
| `sky`   | `#5EABD6` | **Primary**: nút chính, link, tiêu điểm, trạng thái "đúng"             |
| `blush` | `#FFB4B4` | **Accent/phụ**: highlight, hover, trạng thái được chọn, khối trang trí |
| `red`   | `#E14434` | **CTA nổi bật** + lỗi/sai/cảnh báo/hành động nguy hiểm                 |
| `ink`   | `#111111` | Chữ, viền, bóng                                                        |
| `white` | `#FFFFFF` | **Nền trang chính**, phần tử lồng trong card (input, đáp án), chữ trên đỏ (xem 2.3)         |

> Chỉ dùng đúng các giá trị trên. Không dùng đen thuần `#000`, không dùng xám khác; cần xám phụ thì dùng `ink` với chữ nhỏ hơn/italic, không giảm opacity.
> Nền trang dùng `white` (chữ dễ đọc nhất); `cream` chỉ dùng cho bề mặt/dải cần tách khối. Phần tử lồng trong card (input, đáp án) dùng `white`.

### 2.2 Quy tắc phân bổ (60-30-10)

- ~60% `white` (nền trang) + `cream` (bề mặt/dải)
- ~30% `sky` (primary) + `blush` (phụ)
- ~10% `red` (CTA, lỗi, điểm nhấn) → **dùng tiết kiệm**, mỗi màn hình tối đa 1–2 CTA đỏ.

### 2.3 Chữ trên nền màu (độ tương phản)

| Nền              | Chữ                | Ghi chú                                                                                   |
| ---------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `cream`, `white` | `ink`              | Mặc định                                                                                  |
| `sky`            | `ink`              | **Không dùng chữ trắng** (không đủ tương phản)                                            |
| `blush`          | `ink`              |                                                                                           |
| `red`            | `ink` hoặc `white` | Chữ trắng **chỉ** cho cỡ lớn/đậm (≥ 24px, hoặc ≥ 18.66px đậm). Chữ nhỏ trên đỏ dùng `ink` |

Yêu cầu tối thiểu WCAG AA: 4.5:1 cho chữ thường, 3:1 cho chữ lớn và icon.
> Khối giải thích sau khi nộp bài: nền `sky` khi đúng, `red` khi sai (trùng màu với đáp án tương ứng), viền `ink`. `blush` **chỉ** dành cho "đã chọn" – không dùng cho trạng thái sai.
> Icon trang trí/đại diện không được là chữ `sky` hay `blush` trên `white` (chỉ ~2,5:1 và ~1,8:1): cho icon nằm trong một khối màu `sky`/`blush` với icon `ink`.

### 2.4 Màu theo trạng thái

Palette không có xanh lá, vì vậy **không dựa riêng vào màu**: mọi trạng thái đều kèm icon và/hoặc nhãn chữ.

| Trạng thái           | Nền        | Viền  | Kèm theo                                                                      |
| -------------------- | ---------- | ----- | ----------------------------------------------------------------------------- |
| Mặc định             | `white`    | `ink` |                                                                               |
| Hover                | `blush`    | `ink` | Dịch bóng (xem 5.2)                                                           |
| Focus                | giữ nguyên | `ink` | Ring `ink` 3px + offset 2px (ring `sky` chỉ ~2,5:1 trên `white`/`cream`, không đạt 3:1) |
| Đã chọn              | `blush`    | `ink` | Icon ✓ hoặc đánh dấu hình học                                                 |
| Đúng                 | `sky`      | `ink` | Icon ✓ + chữ "Đúng"                                                           |
| Sai / lỗi            | `red`      | `ink` | Icon ✕ + chữ "Sai"/thông báo lỗi                                              |
| Vô hiệu hóa          | `cream`    | `ink` | Chữ `ink` gạch chéo/italic, không dùng opacity, `cursor-not-allowed`, bỏ bóng |
| Cảnh báo / nguy hiểm | `red`      | `ink` | Icon cảnh báo + nhãn                                                          |

---

## 3. Typography

### 3.1 Font

- **Cal Sans**: tiêu đề, nhãn nút, điều hướng, nhấn mạnh.
- **Momo Trust Display**: tiêu đề hiển thị lớn (hero, tên quiz), con số lớn (điểm, đồng hồ).
- **Josefin Sans** (fallback tiếng Việt + chữ nội dung): đoạn văn, mô tả, câu hỏi dài, và mọi ký tự mà 2 font trên thiếu dấu.

Load font (đặt trong `index.html` hoặc CSS toàn cục):

```css
@import url("https://fonts.googleapis.com/css2?family=Cal+Sans&family=Momo+Trust+Display&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap");
```

Cấu hình Tailwind:

```js
fontFamily: {
  display: ['"Momo Trust Display"', '"Josefin Sans"', 'sans-serif'],
  heading: ['"Cal Sans"', '"Josefin Sans"', 'sans-serif'],
  body:    ['"Josefin Sans"', '"Cal Sans"', 'sans-serif'],
}
```

> Fallback hoạt động theo từng ký tự: ký tự tiếng Việt thiếu ở font đầu sẽ tự lấy từ Josefin Sans. **Phải test mọi tiêu đề có dấu** (ví dụ: "Ôn tập", "Kết quả", "Thử thách", "Đăng nhập").

### 3.2 Tạo thứ bậc (hierarchy) bằng hiệu ứng chữ

Cal Sans và Momo Trust Display chỉ có **một độ đậm**, nên:

- Đặt `font-synthesis: none` toàn cục để **không** bị bold/italic giả: `* { font-synthesis: none; }`
- Thứ bậc được tạo bằng **cỡ chữ, kiểu chữ, độ đậm của Josefin Sans, italic, chữ hoa, giãn chữ và khối màu nền**, không dùng `font-bold` lên Cal Sans / Momo.

| Cấp                       | Font               | Cỡ (mobile → desktop) | Hiệu ứng                                                    |
| ------------------------- | ------------------ | --------------------- | ----------------------------------------------------------- |
| Display                   | Momo Trust Display | 40 → 72px             | `uppercase`, `leading-none`, `tracking-tight`               |
| H1                        | Momo Trust Display | 32 → 48px             | `leading-tight`                                             |
| H2                        | Cal Sans           | 24 → 32px             | `leading-tight`                                             |
| H3                        | Cal Sans           | 20 → 24px             |                                                             |
| Nhãn/Eyebrow              | Cal Sans           | 12 → 14px             | `uppercase`, `tracking-widest`                              |
| Body lớn (câu hỏi)        | Josefin Sans       | 18 → 20px             | `font-medium` (500), `leading-relaxed`                      |
| Body                      | Josefin Sans       | 16px                  | `font-normal` (400), `leading-relaxed`                      |
| Chú thích                 | Josefin Sans       | 14px                  | `italic` hoặc `font-medium`, đủ tương phản                  |
| Số liệu lớn (điểm, timer) | Momo Trust Display | 32 → 64px             | `tabular-nums` nếu có                                       |
| Nhấn mạnh trong đoạn      | Josefin Sans       | giữ nguyên            | `font-bold` (700) hoặc `italic`, hoặc nền highlight `blush` |

Quy tắc phụ:

- Cỡ chữ body tối thiểu **16px**; không có chữ nội dung dưới 14px.
- Độ rộng dòng đọc tối đa ~65 ký tự (`max-w-prose`).
- Căn trái là mặc định cho nội dung; căn giữa chỉ cho hero, kết quả, tiêu đề ngắn.
- Không viết hoa toàn bộ câu dài, chỉ dùng `uppercase` cho Display, nhãn ngắn, nút.

---

## 4. Bố cục & khoảng cách

- **Lưới cơ sở 8px.** Spacing chỉ dùng: `4, 8, 12, 16, 24, 32, 48, 64, 96` (Tailwind: `1, 2, 3, 4, 6, 8, 12, 16, 24`).
- Container: `max-w-6xl` (1152px), padding ngang `px-4` mobile, `px-6` tablet, `px-8` desktop.
- Breakpoint theo Tailwind mặc định; **thiết kế mobile-first**, kiểm tra tại 360px, 768px, 1280px.
- Khoảng cách giữa các section: `py-12` mobile, `py-20` desktop.
- Bố cục dùng CSS Grid 12 cột (desktop), 4 cột (mobile). Cho phép lệch lưới có chủ ý cho khối trang trí, nhưng nội dung chính phải thẳng hàng với lưới.
- Vùng chạm tối thiểu **44×44px** cho mọi phần tử tương tác.

---

## 5. Viền, bóng, bo góc

### 5.1 Token

| Token      | Giá trị                                  | Dùng cho                                                   |
| ---------- | ---------------------------------------- | ---------------------------------------------------------- |
| Viền       | `2px solid #111` (`border-2 border-ink`) | Card, nút, input, modal, badge                             |
| Bóng chuẩn | `4px 4px 0 0 #111` (`shadow-hard`)       | Card, nút, input focus                                     |
| Bóng nhỏ   | `2px 2px 0 0 #111` (`shadow-hard-sm`)    | Badge, chip, trạng thái hover                              |
| Bóng lớn   | `8px 8px 0 0 #111` (`shadow-hard-lg`)    | Modal, khối nổi bật                                        |
| Bo góc     | `rounded` (4px) / `rounded-lg` (8px)     | Card, input: 8px · Nút: 4–8px · Badge/chip: `rounded-full` |

- **Bóng luôn màu `ink`, offset cứng, blur = 0**, hướng xuống phải. Không dùng bóng mờ (`shadow-md`, `shadow-lg` mặc định của Tailwind).
- Không dùng bo góc lớn hơn 8px, trừ pill (`rounded-full`) cho nút/badge và hình tròn trang trí.
- Không lồng quá 2 lớp viền-bóng (card trong card): phần tử con bên trong card dùng viền, **không** thêm bóng.

### 5.2 Hành vi tương tác (ép bóng)

```
Mặc định : shadow 4px 4px
Hover    : translate(2px, 2px) + shadow 2px 2px
Active   : translate(4px, 4px) + shadow 0
```

Áp dụng cho nút và card có thể bấm. Card chỉ để đọc thì **không** di chuyển khi hover.

---

## 6. Hình khối trang trí (Bauhaus)

- Chỉ dùng **hình tròn, hình vuông, tam giác** (và đường thẳng/vòng cung hình học đơn giản), tô phẳng bằng màu trong palette, có thể có viền `ink` 2px.
- Dùng làm: nền hero, góc card, ngăn cách section, minh họa trạng thái rỗng, ảnh đại diện mặc định.
- Quy tắc:
  - Mỗi màn hình tối đa **3–5 khối trang trí**, kích thước chênh lệch rõ (lớn / vừa / nhỏ).
  - Đặt `aria-hidden="true"`, `pointer-events-none`, **không che chữ hay nút**.
  - Cho phép xoay theo góc **0°, 45°, 90°**; không xoay góc lẻ.
  - Không đặt khối trang trí trong vùng đọc câu hỏi/đáp án.
  - Ưu tiên SVG inline; không dùng ảnh raster hay icon kiểu 3D/gradient.

---

## 7. Component

### 7.1 Nút

| Biến thể  | Nền     | Chữ                              | Dùng khi                                                              |
| --------- | ------- | -------------------------------- | --------------------------------------------------------------------- |
| Primary   | `sky`   | `ink`                            | Hành động chính thường gặp (Tiếp theo, Bắt đầu)                       |
| CTA       | `red`   | `white` (chữ lớn/đậm) hoặc `ink` | Hành động quan trọng nhất của màn hình (Nộp bài). Tối đa 1 / màn hình |
| Secondary | `white` | `ink`                            | Hành động phụ (Quay lại, Hủy)                                         |
| Accent    | `blush` | `ink`                            | Hành động nhẹ, lọc, tuỳ chọn                                          |
| Danger    | `red`   | `ink`/`white`                    | Xóa, thoát giữa chừng. Phải có bước xác nhận                          |

- Chữ nút: Cal Sans, `uppercase` hoặc Title case thống nhất, `tracking-wide`.
- Kích thước: cao tối thiểu 44px; padding `px-6 py-3` (chuẩn), `px-4 py-2` (nhỏ).
- Có icon: icon bên trái chữ, cách 8px.
- Trạng thái tải: giữ kích thước, thay chữ bằng spinner hình học + chữ "Đang xử lý…".

### 7.2 Card

- Nền `cream` (hoặc `white`/`blush`/`sky` khi cần nhấn), viền 2px, bóng 4px, bo 8px, padding `p-6`.
- Có thể có "thanh nhãn" màu ở đầu card (khối chữ nhật phẳng cùng viền) chứa eyebrow; thanh nhãn chỉ dùng `sky`/`blush` (không dùng `cream` trên card `cream` vì trùng nền) và xen kẽ 2 màu này giữa các card trong cùng một lưới.

### 7.3 Input / Textarea / Select

- Nền `white`, viền `ink` 2px, bo 8px, cao ≥ 44px, chữ `ink` 16px.
- Focus: bóng cứng 4px + ring `ink` 3px (không dùng viền mờ mặc định của trình duyệt).
- Nhãn đặt **phía trên** input, Cal Sans 14px; không dùng placeholder thay nhãn.
- Lỗi: viền `ink`, nền `red` nhẹ **không được phép** → dùng khung thông báo riêng bên dưới (nền `red`, chữ `ink`, icon ✕, mô tả cách sửa).
- Checkbox/radio: khối vuông/tròn 24px, viền 2px; chọn → tô `sky` + dấu ✓ `ink`.

### 7.4 Badge / Chip / Tag

- `rounded-full`, viền 2px, bóng nhỏ hoặc không bóng, Cal Sans 12–14px uppercase.
- Màu theo ngữ nghĩa ở mục 2.4; không dùng chỉ màu để phân biệt.

### 7.5 Modal / Dialog

- Nền `cream`, viền 2px, bóng lớn 8px, bo 8px; lớp phủ nền `ink` với độ trong suốt cố định (`bg-ink/60`), đây là ngoại lệ duy nhất cho opacity.
- Tiêu đề Cal Sans, nút đóng (✕) luôn có nhãn truy cập, bẫy focus, đóng bằng `Esc`.

### 7.6 Thanh điều hướng

- Nền `white` (hoặc `cream` cho biến thể nhấn), viền dưới 2px `ink`; logo bằng Momo Trust Display.
- Mục đang chọn: nền `sky` + viền; hover: nền `blush`.
- Mobile: menu dạng ngăn kéo, viền + bóng như card.

### 7.7 Thanh tiến độ, bảng, thông báo (toast)

- Thanh tiến độ: khung viền 2px, phần đã đạt tô `sky`, thanh phân đoạn vuông (không bo tròn mềm).
- Bảng: viền 2px ngoài, đường kẻ trong 1–2px `ink`, hàng tiêu đề nền `blush`, hàng xen kẽ `white`/`cream`.
- Toast: card nhỏ nền `cream`, viền + bóng, icon theo trạng thái, tự đóng sau ≥ 5 giây và có nút đóng.

---

## 8. Biểu tượng & hình ảnh

- Icon: dạng nét (stroke) đơn giản, độ dày **2px**, đầu nét vuông/tròn nhất quán, màu `ink`. Gợi ý bộ icon: Lucide.
- Kích thước icon: 16 / 20 / 24px.
- Hình ảnh nội dung (ảnh người dùng tải lên): bọc viền 2px + bo ≤ 8px; không dùng bộ lọc, bóng mờ.
- Mọi ảnh có `alt`; ảnh trang trí để `alt=""`.

---

## 9. Chuyển động

**Luận điểm:** chỉ hai nơi được "kể chuyện" — **chuyển câu hỏi** và **khoảnh khắc nộp bài**; mọi thứ còn lại chỉ là phản hồi tức thời. Không rải hiệu ứng giống nhau vào mọi section.

- **Easing:** đúng **một** token — `--ease-quint` = `cubic-bezier(0.22, 1, 0.36, 1)` (giảm tốc mạnh, không overshoot/bounce) cho mọi chuyển động.
- **Thời lượng:** phản hồi tương tác **150ms** · vào trang **200–300ms** · khoảnh khắc chính ≤ **500ms**. Không dùng một con số cho mọi thứ.
- Chỉ animate: `transform`, `translate`, `opacity`, `box-shadow`, `background-color`. Không animate bố cục (width/height/top/margin).
- Được phép:
  - ép bóng khi hover / active (xem 5.2);
  - chuyển câu hỏi: mờ + trượt ngắn, và **các đáp án nối tiếp nhau xuất hiện** (~35ms mỗi đáp án, class `.stagger`);
  - hero: khối trang trí Bauhaus "nở" **một lần** khi vào trang (`.bloom`);
  - nộp bài: khối kết quả trượt vào (`.result-in`) và vòng điểm "bật" lên (`.score-pop`);
  - nhắc nhở **một lần**: đồng hồ sắp hết giờ giật nhẹ (`.nudge`), đáp án sai rung nhẹ (`.answer-shake`).
- **Không** dùng hiệu ứng lặp vô hạn trong vùng làm bài (tránh phân tâm), trừ spinner tải.
- **Bắt buộc** hỗ trợ `prefers-reduced-motion`: tắt mọi animation/transition, giữ nguyên trạng thái cuối.

---

## 10. Khả năng truy cập (A11y)

- Tương phản đạt WCAG AA (xem 2.3). Không truyền đạt thông tin chỉ bằng màu.
- Điều hướng bàn phím đầy đủ; thứ tự Tab hợp lý; focus luôn nhìn thấy (ring `ink` 3px, offset 2px).
- Dùng thẻ ngữ nghĩa (`button`, `nav`, `main`, `label`…); đáp án quiz dùng `radio`/`checkbox` thật hoặc ARIA tương đương.
- Kết quả đúng/sai phải được đọc bằng trình đọc màn hình (`aria-live="polite"`).
- Hỗ trợ zoom tới 200% mà không vỡ bố cục.

---

## 11. Giọng điệu & nội dung (tiếng Việt)

- Tông: **thân thiện, rõ ràng, tôn trọng người học**; vui vừa phải, không lố, không dùng tiếng lóng nặng.
- Dùng "bạn" xưng hô người dùng; câu ngắn, động từ rõ ràng ở nút: "Bắt đầu làm bài", "Nộp bài", "Xem kết quả".
- Thông báo lỗi: nói **chuyện gì xảy ra + cách sửa** ("Đáp án chưa được chọn. Hãy chọn một đáp án để tiếp tục.").
- Phản hồi đúng/sai mang tính khích lệ, không chê bai.
- Thống nhất thuật ngữ: _Quiz_, _Câu hỏi_, _Đáp án_, _Nộp bài_, _Kết quả_, _Điểm_.
- Định dạng số/ngày theo Việt Nam (`dd/mm/yyyy`, dấu `.` ngăn nghìn, dấu `,` thập phân).

---

## 12. Cấu hình Tailwind mẫu (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      cream: "#FEFBC7",
      sky: "#5EABD6",
      blush: "#FFB4B4",
      red: "#E14434",
      ink: "#111111",
      white: "#FFFFFF",
    },
    fontFamily: {
      display: ['"Momo Trust Display"', '"Josefin Sans"', "sans-serif"],
      heading: ['"Cal Sans"', '"Josefin Sans"', "sans-serif"],
      body: ['"Josefin Sans"', '"Cal Sans"', "sans-serif"],
    },
    borderRadius: {
      none: "0",
      DEFAULT: "4px",
      lg: "8px",
      full: "9999px",
    },
    extend: {
      boxShadow: {
        "hard-sm": "2px 2px 0 0 #111111",
        hard: "4px 4px 0 0 #111111",
        "hard-lg": "8px 8px 0 0 #111111",
      },
      borderWidth: { DEFAULT: "2px" },
      transitionDuration: { DEFAULT: "150ms" },
      transitionTimingFunction: {
        quint: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
```

> Ghi đè `colors` (không dùng `extend.colors`) để **chặn** việc vô tình dùng màu ngoài palette.

CSS toàn cục (`index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    font-synthesis: none;
  }
  html {
    background-color: #ffffff;
    color: #111111;
    font-family: "Josefin Sans", "Cal Sans", sans-serif;
  }
  :focus-visible {
    outline: 3px solid #111111;
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-lg
           border-2 border-ink shadow-hard font-heading uppercase tracking-wide
           transition-all duration-150 ease-out
           hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-hard-sm
           active:translate-x-1 active:translate-y-1 active:shadow-none;
  }
  .btn-primary {
    @apply bg-sky text-ink;
  }
  .btn-cta {
    @apply bg-red text-ink;
  }
  .btn-secondary {
    @apply bg-white text-ink;
  }
  .btn-accent {
    @apply bg-blush text-ink;
  }
  .card {
    @apply bg-cream border-2 border-ink rounded-lg shadow-hard p-6;
  }
  .input {
    @apply w-full min-h-[44px] px-4 py-2 bg-white border-2 border-ink rounded-lg text-ink focus:shadow-hard;
  }
}
```

---

## 13. Checklist trước khi merge UI

- [ ] Chỉ dùng màu trong palette; chữ đúng quy tắc tương phản (2.3).
- [ ] Mọi phần tử tương tác: viền 2px, bóng cứng, trạng thái hover/active/focus/disabled đầy đủ.
- [ ] Font đúng vai trò; tiêu đề tiếng Việt hiển thị đủ dấu; không có bold/italic giả.
- [ ] Spacing theo thang 8px; vùng chạm ≥ 44px.
- [ ] Hình khối trang trí ≤ 5 / màn hình, không che nội dung.
- [ ] Trạng thái đúng/sai/lỗi có icon + chữ, không chỉ dựa vào màu.
- [ ] Chuyển động theo token (phản hồi 150ms · vào trang 200–300ms · khoảnh khắc ≤ 500ms), có `prefers-reduced-motion`.
- [ ] Kiểm tra mobile 360px, tablet 768px, desktop 1280px.
- [ ] Điều hướng bằng bàn phím được; có `alt`, `aria-*` cần thiết.
- [ ] Nội dung tiếng Việt thống nhất thuật ngữ, thông báo lỗi có hướng dẫn sửa.

---

_Phiên bản 1.1 · Mọi thay đổi về token (màu, font, bóng, bo góc, easing) phải cập nhật tại file này trước khi áp dụng vào code._
