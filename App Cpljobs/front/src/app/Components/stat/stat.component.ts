import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce.service';

import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'category',
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
    tooltips: {
      backgroundColor: 'blue', 
      titleFontColor: 'white', 
      bodyFontColor: 'white', 
    },
    legend: {
      labels: {
        fontColor: 'green', 
      },
    },
  };
  
  public lineChartType = 'line'; 
  

  public lineChartOptions1: any = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'category',
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
    tooltips: {
      backgroundColor: 'blue', 
      titleFontColor: 'white', 
      bodyFontColor: 'white', 
    },
    legend: {
      labels: {
        fontColor: 'green', 
      },
    },
  };
  
  public lineChartType1 = 'line'; 


  public lineChartDataStat: any[] = [];
  public lineChartLabelsStat: string[] = [];
  public lineChartDataStat1: any[] = [];
  public lineChartLabelsStat1: string[] = [];
  public startDate: string = '';
  public endDate: string = '';
  
  user: any;

  statique!: FormGroup;
  statique1!: FormGroup;

  startDate1!: Date;
  startDate2!: Date;

  constructor(
    private anonceservice: AnnonceService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.startDate1 = new Date();
    this.startDate2 = new Date();

    this.statique = this.fb.group({
      startDate1: this.fb.control(this.formatDate(this.startDate1))
    });

    this.statique1 = this.fb.group({
      startDate2: this.fb.control(this.formatDate(this.startDate1))
    });

    this.stat();
    this.stat1();
  }
  
  onStartDateChange(event: any) {
    const rawDateValue = event.target.value;

    this.startDate1 = new Date(rawDateValue);

    this.stat();
  }

  
  

   formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(6, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  stat() {
    const formattedStartDate = this.formatDate(this.startDate1);
  
    this.anonceservice.getNombreAnnoncesParJourSemaine(this.user.id, formattedStartDate).subscribe(
      (data: any) => {
        const userStats: { [key: string]: number } = data[Object.keys(data)[0]];
        const dates = Object.keys(userStats);
        const counts = Object.values(userStats);
  
        const maxCount = Math.max(...counts);
        const yAxisMax = maxCount + 1;
  
        console.log(data);
        const userName = this.user.nom;
        const lastName = this.user.prenom;
  
        this.lineChartDataStat = [
          {
            data: counts,
            label: `Nombre des annonces pour (${userName} ${lastName})`,
            borderColor: '#5BC2FF',
            backgroundColor:  '#5BC2FF'
          }
        ];
        this.lineChartLabelsStat = dates;
  
        this.lineChartOptions = {
          scales: {
            y: {
              beginAtZero: true, 
              max: yAxisMax,
            }
          }
        };
  
        this.startDate = dates[0];
        this.endDate = dates[dates.length - 1];
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données pour stat() :', error);
      }
    );
  }
  
  stat1() {
    const formattedStartDate = this.formatDate(this.startDate2);
  
    this.anonceservice.getNombreAnnoncesParMois(this.user.id, formattedStartDate).subscribe(
      (data: any) => {
        const userStats: { [key: string]: number } = data[Object.keys(data)[0]];
        const dates = Object.keys(userStats);
        const counts = Object.values(userStats);
  
        const maxCount = Math.max(...counts);
        const yAxisMax = maxCount + 1;
  
        console.log(data);
        const userName = this.user.nom;
        const lastName = this.user.prenom;
  
        this.lineChartDataStat1 = [
          {
            data: counts,
            label: `Nombre des annonces pour (${userName} ${lastName})`,
            borderColor: '#FFA500',
            backgroundColor:  '#FFA500'
          }
        ];
        this.lineChartLabelsStat1 = dates;
  
        this.lineChartOptions1 = {
          scales: {
            y: {
              beginAtZero: true, 
              max: yAxisMax,
            }
          }
        };
  
        this.startDate = dates[0];
        this.endDate = dates[dates.length - 1];
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données pour stat1() :', error);
      }
    );
  }
}  