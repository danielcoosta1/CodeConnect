export const breakpoints = {
  // Padrão mundial para celulares e iPads em pé
  mobile: "768px", 
  
  // Padrão mundial para iPads deitados e laptops menores
  tablet: "1024px", 
  
  // Mantemos o seu original, pois o 'device.desktop' calcula tudo acima do tablet
  desktop: "1440px",
};

export const device = {
  // Tudo até 768px
  mobile: `(max-width: ${breakpoints.mobile})`,
  
  // Tudo até 1024px
  tablet: `(max-width: ${breakpoints.tablet})`,
  
  // O que for maior que 1024px (1025px em diante)
  desktop: `(min-width: ${parseInt(breakpoints.tablet) + 1}px)`,
};