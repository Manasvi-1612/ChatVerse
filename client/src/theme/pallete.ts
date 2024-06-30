
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#1C232B", // 1E2630 1C232B
  500_8: 'rgba(145,158,171,0.08)',
  500_12: 'rgba(145,158,171,0.12)',
  500_16: 'rgba(145,158,171,0.16)',
  500_24: 'rgba(145,158,171,0.24)',
  500_32: 'rgba(145,158,171,0.32)',
  500_48: 'rgba(145,158,171,0.48)',
  500_56: 'rgba(145,158,171,0.56)',
  500_80: 'rgba(145,158,171,0.8)'
};

function createGradient(color1: string, color2: string) {
  return `linear-gradient(120deg, ${color1} 0%, ${color2} 98%)`;
}



const palette = {
  light: {
    mode: "light",
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: "#F0F3F8", default: "#fff", neutral: GREY[200], gradient: createGradient('rgba(212,109,220,1)', 'rgba(126,147,172,1)') },
    action: { active: GREY[600] },
  },
  dark: {
    mode: "dark",
    text: { primary: "#fff", secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16], gradient: createGradient('rgba(212,109,220,0.5)', 'rgba(126,147,172,0.5)') },
    action: { active: GREY[500] },
  },
};

<<<<<<< HEAD
export default palette;
=======
export default palette;
>>>>>>> 7f66f1c0d0b0c2f16704c4665a160e585e42d2b1
