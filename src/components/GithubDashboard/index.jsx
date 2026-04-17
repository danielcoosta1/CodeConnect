import { useEffect, useState } from "react";
import { buscarEstatisticasGithub } from "../../services/githubService";
import LanguagePieChart from "../LanguagePieChart";
import { GitHubCalendar } from "react-github-calendar";
import LoadingState from "../LoadingState";
import {
  DashboardGrid,
  MetricsRow,
  MetricCard,
  ChartSection,
  CalendarSection,
} from "../../pages/Perfil/style";
import { EmptyMessage, SectionTitle } from "../../pages/Perfil/style";

const GithubDashboard = ({ githubUsername, isOwner }) => {
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      if (githubUsername) {
        setLoading(true);
        try {
          const dados = await buscarEstatisticasGithub(githubUsername);
          setDadosDashboard(dados);
        } catch (error) {
          console.error("Erro ao carregar Github:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    carregarDados();
  }, [githubUsername]);

  if (!githubUsername) {
    return (
      <EmptyMessage>
        <p>
          {isOwner
            ? "Sua conta ainda não está vinculada ao GitHub."
            : "Este desenvolvedor ainda não vinculou o GitHub."}
        </p>
        {isOwner && (
          <p className="small">
            Saia da conta e entre novamente utilizando o botão{" "}
            <strong>"Entrar com GitHub"</strong>.
          </p>
        )}
      </EmptyMessage>
    );
  }

  if (loading) {
    return <LoadingState texto="Mapeando atividade no GitHub..." size={45} />;
  }

  if (!dadosDashboard) {
    return (
      <EmptyMessage>
        <p>Não foi possível carregar os dados no momento.</p>
      </EmptyMessage>
    );
  }

  return (
    <DashboardGrid>
      <MetricsRow>
        <MetricCard $color="#d4af37">
          <h4>⭐ {dadosDashboard.metricas.stars}</h4>
          <p>Total Stars</p>
        </MetricCard>
        <MetricCard $color="#58a6ff">
          <h4>🔀 {dadosDashboard.metricas.forks}</h4>
          <p>Total Forks</p>
        </MetricCard>
        <MetricCard $color="#81fe88">
          <h4>📚 {dadosDashboard.metricas.repositorios}</h4>
          <p>Repositórios Públicos</p>
        </MetricCard>
      </MetricsRow>

      <ChartSection>
        <SectionTitle>Distribuição de Linguagens</SectionTitle>
        {dadosDashboard.linguagens.length > 0 ? (
          <LanguagePieChart data={dadosDashboard.linguagens} />
        ) : (
          <EmptyMessage style={{ padding: "2rem" }}>
            <p>Nenhuma linguagem principal definida nos repositórios.</p>
          </EmptyMessage>
        )}
      </ChartSection>

      <CalendarSection>
        <SectionTitle>Mapa de Contribuições</SectionTitle>
        <GitHubCalendar
          username={githubUsername}
          colorScheme="dark"
          blockSize={14}
          blockMargin={5}
          fontSize={14}
        />
      </CalendarSection>
    </DashboardGrid>
  );
};

export default GithubDashboard;
