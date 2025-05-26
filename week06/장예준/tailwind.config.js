// // Tailwind CSS 설정 파일

// module.exports = {
//   // Tailwind가 어떤 파일 안의 class를 분석할지 지정하는 옵션
//   content: [
//     './index.html', // 루트에 있는 index.html 파일 안에서 Tailwind 클래스 찾기
//     './src/**/*.{js,jsx,ts,tsx}', // src 폴더 내 모든 .js, .jsx, .ts, .tsx 파일을 포함 
//   ],

//   // Tailwind의 테마를 커스터마이징할 수 있는 부분입니다
//   theme: {
//     extend: {
//       // 여기 안에 사용자 정의 색상, 폰트, 여백 등을 추가할 수 있음
//       // 예시 colors: { primary: '#1da1f2' }
//     },
//   },

//   // Tailwind의 플러그인 기능을 사용할 수 있다
//   plugins: [
//     // 예시: require('@tailwindcss/forms')
//     // 현재는 플러그인을 사용하지 않기 때문에 빈 배열로 구성을 하였습니다다
//   ],
// };


/** @type {import('tailwindcss').Config} */
export default {
  content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/flowbite/**/*.js",
        ],
  theme: {
    extend: {},
  },
  plugins: [],}