import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


//Servicios utilizados
import { AuthenticationService } from './authentication.service';

//Se importan los modelos a utilizar
import { Car } from '../models/car';

@Injectable()
export class CarService {

	public base: string = "http://localhost:8000/api/v1/";
	public options: RequestOptions;
	public headers: Headers;

 //Se construyen aquellos atributos utilizados por la clase
	constructor(
		private http: Http,
		private authenticationService: AuthenticationService) 
	{
		console.log("Construyendo la cabezera con el token necesario");
		
    	console.log(this.authenticationService.token);

		this.headers = new Headers({

			'Authorization': 'Bearer ' + this.authenticationService.token,
			'Content-Type': 'application/json'
		});

		this.options = new RequestOptions({ headers: this.headers });


	}

	//Este metodo obtiene los usuarios y utiliza la cabezera para el token
	getCars(): Observable<Car[]> {
		// add authorization header with jwt token

		console.log("Construyendo la cabezera con el token necesario");
		

		console.log("Haciendo la peticion a la API de usuarios");
		return this.http.get(this.base+'cars', this.options).map((res: Response) => res.json());
	}


	createCar(car: Car): Observable<Car> {
		// add authorization header with jwt token

		console.log("Haciendo la peticion a la API de autos");
		console.log(JSON.stringify(car));
		//JSON.stringify({name:car.name ,model: car.model,year: car.year,users_id:car.users_id}),
		return this.http.post(this.base+'cars', JSON.stringify(car), this.options).map((res: Response) => res.json() as Car);

	}

	deleteCar(id){

		return this.http.delete(this.base+'cars/'+id, this.options).map((res: Response) => res.json());

	}

	updateCar(car: Car, id: number){
	 return this.http.put(this.base+'cars/'+id, JSON.stringify(car), this.options).map((res: Response) => res.json());
  }



}
