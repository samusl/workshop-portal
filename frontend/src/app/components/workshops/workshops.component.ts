import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';   
import { WorkshopService } from '../../services/workshop.service';
import { DatePipe } from '@angular/common';
import { workshop } from '../../Models/workshop';
import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [RouterLink, DatePipe, CommonModule, NgFor, FormsModule],   
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {
  workshops: workshop[] = [];
  novoWorkshop: workshop = { id: 0, nome: '', dataRealizacao: "31/10/2025", descricao: '' };
    mensagemErro: string | null = null;

  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {
    this.workshopService.getAll().subscribe(data => {
      this.workshops = data;
    });
  }
  adicionarWorkshop(): void {
  if (!this.novoWorkshop.nome.trim()) {
    this.mensagemErro = 'O nome é obrigatório!';
    return;
  }

  const workshopPayload = {
    nome: this.novoWorkshop.nome,
    descricao: this.novoWorkshop.descricao,
    dataRealizacao: new Date(this.novoWorkshop.dataRealizacao).toISOString()
  };

  this.workshopService.create(workshopPayload).subscribe({
    next: (workshop) => {
      this.workshops.push(workshop);
      this.novoWorkshop = { id: 0, nome: '', dataRealizacao: '', descricao: '' }; // limpa o formulário
      this.mensagemErro = null;
    },
    error: (err) => {
      console.error('Erro ao adicionar workshop:', err);
      this.mensagemErro = 'Erro ao adicionar workshop';
    }
  });
}


}
