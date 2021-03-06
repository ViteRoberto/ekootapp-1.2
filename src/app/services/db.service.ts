import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Empresa{
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface Reto{
  fraseimagen: string;
  imagen: string;
}

export interface Usuario{
  uid:string;
  email:string;
  displayName:string;
  photoURL:string;
  isAnonnymous:string;
  ekoins:number;
  pp:number;
  bp:number;
  rn:number;
  ds:number;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private empresasColeccion: AngularFirestoreCollection<Empresa>;
  private retosColeccion: AngularFirestoreCollection<Reto>;
  private usuariosColeccion: AngularFirestoreCollection<Usuario>;
  private empresas: Observable<Empresa[]>;
  private retos: Observable<Reto[]>;
  private usuarios: Observable<Usuario[]>;

  constructor(private afs: AngularFirestore) {
    this.empresasColeccion = afs.collection<Empresa>('empresas');
    this.retosColeccion = afs.collection<Reto>('retos');
    this.usuariosColeccion = afs.collection<Usuario>('usuarios');

    this.usuarios = this.usuariosColeccion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const informacion = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...informacion };
        });
      })
    );

    this.empresas = this.empresasColeccion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const informacion = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...informacion };
        });
      })
    );

    this.retos = this.retosColeccion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const informacion = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...informacion };
        });
      })
    );
  }

  getUsuario(id){
    return this.usuariosColeccion.doc<Usuario>(id).valueChanges();
  }

  getEmpresas(){
    return this.empresas;
    // var ref = this.afs.collection('empresas');
    // return this.empresasColeccion.ref.where('activo','==',true);
  }

  getEmpresa(id){
    return this.empresasColeccion.doc<Empresa>(id).valueChanges();
  }

  getImpactos(id){
    return this.empresasColeccion.doc<Empresa>(id).collection('impactos').valueChanges();
  }

  getCategorias(id){
    return this.empresasColeccion.doc<Empresa>(id).collection('categorias').valueChanges();
  }

  getRetos(id){
    return this.empresasColeccion.doc(id).collection('retos').valueChanges();
  }

  getInfoReto(id){
    return this.retosColeccion.doc(id).valueChanges();
  }

  getTodosRetos(){
    return this.retos;
  }

  collection$(path, query?) {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data: Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  doc$(path): Observable<any> {
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  /**
   * @param  {string} path 'collection' or 'collection/docID'
   * @param  {object} data new data
   *
   * Creates or updates data on a collection or document.
   **/
  updateAt(path: string, data: Object): Promise<any> {
    const segments = path.split('/').filter(v => v);
    if (segments.length % 2) {
      // Odd is always a collection
      return this.afs.collection(path).add(data);
    } else {
      // Even is always document
      return this.afs.doc(path).set(data, { merge: true });
    }
  }

  /**
   * @param  {string} path path to document
   *
   * Deletes document from Firestore
   **/
  delete(path) {
    return this.afs.doc(path).delete();
  }
}