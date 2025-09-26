import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from '../../services/colaborador.service';
import { Colaborador } from '../../Models/Colaborador';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})

export class ColaboradoresComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  novoColaborador: Partial<Colaborador> = { nome: '' };
  mensagemErro: string | null = null;

  constructor(private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    this.carregarColaboradores();
  }

  carregarColaboradores(): void {
    this.colaboradorService.getAll().subscribe({
      next: (data) => {
        this.colaboradores = data;
      },
      error: (err) => {
        console.error('Erro ao carregar colaboradores:', err);
        this.mensagemErro = 'Erro ao carregar colaboradores';
      }
    });
  }

  adicionarColaborador(): void {
  if (!this.novoColaborador.nome || !this.novoColaborador.nome.trim()) {
    this.mensagemErro = 'O nome é obrigatório!';
    return;
  }

  this.colaboradorService.create(this.novoColaborador).subscribe({
    next: (colab) => {
      this.colaboradores.push(colab);
      this.novoColaborador = { nome: '' }; 
      this.mensagemErro = null;
    },
    error: (err) => {
      console.error('Erro ao adicionar colaborador:', err);
      this.mensagemErro = 'Erro ao adicionar colaborador';
    }
  });
  }
}
