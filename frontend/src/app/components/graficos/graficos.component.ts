import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { WorkshopService, Workshop } from '../../services/workshop.service';

Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  barChartData: any;
  barChartOptions = { responsive: true };
  barChartType = 'bar' as const;

  pieChartData: any;
  pieChartOptions = { responsive: true };
  pieChartType = 'pie' as const;

  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.workshopService.getAll().subscribe((workshops: Workshop[]) => {
      // -------------------------
      // Gráfico de barras
      // -------------------------
      const participacaoPorColaborador: { [nome: string]: number } = {};

      workshops.forEach(ws => {
        ws.presencas?.forEach(p => {
          const nome = p.colaborador.nome;
          participacaoPorColaborador[nome] = (participacaoPorColaborador[nome] || 0) + 1;
        });
      });

      this.barChartData = {
        labels: Object.keys(participacaoPorColaborador),
        datasets: [
          {
            label: 'Workshops Participados',
            data: Object.values(participacaoPorColaborador)
          }
        ]
      };

      // -------------------------
      // Gráfico de pizza
      // -------------------------
      const colaboradoresPorWorkshop = workshops.map(ws => ({
        nome: ws.nome,
        qtd: ws.presencas ? ws.presencas.length : 0
      }));

      this.pieChartData = {
        labels: colaboradoresPorWorkshop.map(w => w.nome),
        datasets: [
          {
            data: colaboradoresPorWorkshop.map(w => w.qtd)
          }
        ]
      };
    });
  }
}
