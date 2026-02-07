import styled from "styled-components";

export const ContainerEstilizado = styled.div`
  display: flex;
  min-height: 100vh;
  gap: 2rem; // Gap padrão para Desktop
  max-width: 120rem;
  margin: 0 auto;
  
  /* Padding superior para compensar o header se houver, ou apenas respiro */
  padding: 4rem 1rem 0 1rem; 

  /* --- RESPONSIVIDADE --- */
  @media (max-width: 1024px) {
    gap: 1rem; // Diminui o espaço entre a sidebar e o conteúdo em tablets
    padding: 2rem 1rem 0 1rem; // Diminui o padding superior
  }

  @media (max-width: 768px) {
    gap: 0; // Em celulares, removemos o gap pois o layout muda drasticamente
    padding: 1rem;
    padding-bottom: 80px; /* Dá um respiro extra na parte inferior para o conteúdo não ficar colado no final da tela, especialmente se tiver um menu fixo */
    
    
  }

  main {
    flex: 1; /* Ocupa todo o espaço restante que a Sidebar deixar */
    width: 100%; /* Garante que não estoure */
    
    /* Configuração de Scroll e Fundo */
    background-color: #00090e;
    border-radius: 8px;
    padding: 1rem; // Adicionado padding interno para o conteúdo não colar na borda
    
    /* Evita que tabelas ou códigos estourem a tela */
    overflow-x: hidden; 
  }
`;