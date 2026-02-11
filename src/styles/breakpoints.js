export const breakpoints = {
  // 768px é o padrão mundial para "fim dos celulares/começo dos tablets"
  mobile: "768px", 
  
  // 1280px pega tablets deitados e laptops menores (telas de 13")
  tablet: "1380px", 
  
  // O que sobrar acima disso é Desktop Wide
  desktop: "1440px",
};

export const device = {
  // Mobile: Tudo até 768px
  mobile: `(max-width: ${breakpoints.mobile})`,
  
  // Tablet: Tudo até 1280px (Isso inclui o mobile se não cuidar, mas a gente usa a ordem certa no CSS)
  tablet: `(max-width: ${breakpoints.tablet})`,
  
  // Desktop: O que for maior que tablet
  desktop: `(min-width: ${parseInt(breakpoints.tablet) + 1}px)`,
};