import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';

import { Car } from '../models/car';


@Component({
  moduleId: module.id,
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

	cars: any = {};

	newCar: Car={
    name:'',
    model:'',
    year:0,
    users_id:0 

  };

//auto seleccionado para modificar
  selectedCar:Car={
      name:'',
      model:'',
      year:0,
      users_id:0 

    }
  //id del auto seleccionado a modificar
  selectedID:number=null;

//booleano para habilitar formulario de update
  habilitado=false;
  //booleano para habilitar formulario de create
  createHabilitado=false;


  constructor(private carService: CarService) { }

  ngOnInit() {
		console.log("Obteniendo vehiculos mediante el servicio de vehiculos");


		this.carService.getCars().subscribe(data => {
			
			this.cars = data;
			console.log(this.cars);
		});
  }


  createCar(car : Car)  {

  	this.carService.createCar(car).subscribe(()=>{

      this.ngOnInit();

       this.newCar={
        name:'',
        model:'',
        year:0,
        users_id:0 

      };

      this.createHabilitado=!this.createHabilitado;

  	});

  }

  deleteCar(id){
    this.carService.deleteCar(id).subscribe(()=>{
      this.ngOnInit();

    });

  }


  updateCar(car: Car){
    this.carService.updateCar(car,this.selectedID).subscribe(()=>{
      this.ngOnInit();
      this.habilitado=!this.habilitado;
    });
  }


  activarUpdate(car: any){
    console.log(car);
    this.habilitado=!this.habilitado;

    this.selectedID=car.id;

    this.selectedCar={
      name:car.name,
      model:car.model,
      year:car.year,
      users_id:car.users_id 

    }

  }

  activarCreate(){
    this.createHabilitado=!this.createHabilitado;
  }

}
