import { UserInformation } from '../../model/user.interface';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfoDefault = {
    id: 1,
    email: "cliente@email.com",
    phone: 3046370804,
    pinNumber: 0
  }

  userData = {
    id: 1,
    email: "cliente@email.com",
    procedures: [
      {
        id: 1,
        type: 'PQRS',
        title: 'Queja sobre el área de cartera',
        date: '21/05/2021',
        rad: 'AL-1234567',
        status: [
          {
            id: 1,
            title: 'Inicia el proceso de solicitud',
            description: 'Se inicializa el proceso directamente con el asesor.',
            date: '22/05/2021',
            position: 'left',
          },
          {
            id: 2,
            title: 'Se procede a validar la aceptación.',
            description: 'Se valida si el usuario cuenta con historial positivo.',
            date: '23/05/2021',
            position: 'right',
          },
          {
            id: 3,
            title: 'Se aprueba la solicitud.',
            description: 'Se llama al usuario y se procede a validar el desembolso y tarjeta de credito.',
            date: '24/05/2021',
            position: 'left',
          },
          {
            id: 4,
            title: 'Se acepta el proceso de desembolso.',
            description: 'Se envia al usuario la cantidad de 1.000,000 COP según lo pactado con el usuario.',
            date: '25/05/2021',
            position: 'right',
          },
          {
            id: 5,
            title: 'Se envia el desembolso a tarjeta de credito.',
            description: 'Se procede a validar la aceptacion del cupo en el Banco.',
            date: '26/05/2021',
            position: 'left',
          },
          {
            id: 6,
            title: 'Desembolso realizado.',
            description: 'El banco Davivienda envia el dinero al banco Bancolombia.',
            date: '27/05/2021',
            position: 'right',
          },
          {
            id: 7,
            title: 'Confirmación del banco externo aceptada.',
            description: 'El banco (bancolombia) ha aceptado el pago a la tarjeta de credito.',
            date: '28/05/2021',
            position: 'left',
          }
        ]
      },
      {
        id: 2,
        type: 'FAC',
        title: 'Factura de proveedores',
        date: '21/06/2021',
        rad: 'AL-8789765468',
        status: [
          {
            id: 1,
            title: 'Proceso 1',
            description: 'Descripción del proceso.',
            date: '21/05/2021',
            position: 'left',
          },
          {
            id: 2,
            title: 'Proceso 2',
            description: 'Descripción del proceso.',
            date: '21/05/2021',
            position: 'right',
          }
        ]
      },
      {
        id: 3,
        type: 'PQRS',
        title: 'Solicitud de generación de informe de cartera.',
        date: '21/07/2021',
        rad: 'AL-3216578',
        status: [
          {
            id: 1,
            title: 'Proceso 1',
            description: 'Descripción del proceso.',
            date: '21/05/2021',
            position: 'left',
          },
          {
            id: 2,
            title: 'Proceso 2',
            description: 'Descripción del proceso.',
            date: '21/05/2021',
            position: 'right',
          },
          {
            id: 3,
            title: 'Proceso 3',
            description: 'Descripción del proceso.',
            date: '21/05/2021',
            position: 'left',
          },
          {
            id: 4,
            title: 'Proceso 4',
            description: 'Descripción del proceso.',
            date: '21/05/2021',
            position: 'right',
          }
        ]
      }]
  }

  signInProccess = (userInformation: UserInformation) => {
    return new Promise((resolve, reject) => {
      try {
        if (userInformation.email === this.userInfoDefault.email && userInformation.phone === this.userInfoDefault.phone) {
          userInformation.id = this.userInfoDefault.id;
          userInformation.pinNumber = this.getRandomPin();

          this.userInfoDefault.pinNumber = userInformation.pinNumber;

          this.setUserData(userInformation);

          resolve({
            userInformation
          });

        } else {
          reject({
            status: 400,
            message: "Email or Phone are incorrect!, please try again."
          })
        }
      } catch (_) {
        reject({
          status: 400,
          message: "Something went wrong!, please try again."
        })
      }
    })
  }

  signInWithPinNumberProccess = (pinNumber: number) => {
    return new Promise((resolve, reject) => {
      try {
        if (pinNumber === this.userInfoDefault.pinNumber) {
          resolve({
            status: 200,
            id: this.userInfoDefault.id,
            pinNumber,
          })
        } else {
          reject({
            status: 400,
            message: "The PIN number is incorrect!, please try again."
          })
        }
      } catch (_) {
        reject({
          status: 400,
          message: "Something went wrong!, please try again."
        })
      }
    })
  }

  signOutProcess = () => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.clear();
        resolve(true);
      } catch (error) {
        reject(true);
      }
    });
  }

  getRandomPin = () => {
    return Math.floor(Math.random() * 500) + 6000;
  }

  getUserData = (userId: number) => {
    return new Promise((resolve, reject) => {
      try {
        if (userId === this.userData.id) {
          resolve(this.userData);
        } else {
          reject({ status: 400, message: "Invalid user." })
        }
      } catch (error) {
        reject({ status: 400, message: "Something went wrong." })
      }
    })
  }

  setUserData = (userInformation: UserInformation) => {
    localStorage.setItem('userInformation', JSON.stringify(userInformation));
  }

  // For implement in the future
  isUserLoggedIn() {
    const data = localStorage.getItem('userInformation');
    return data ? true : false;
  }
}
