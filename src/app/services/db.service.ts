import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Empresa{
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private empresasColeccion: AngularFirestoreCollection<Empresa>;
  private empresas: Observable<Empresa[]>;

  constructor(private afs: AngularFirestore) {
    this.empresasColeccion = afs.collection<Empresa>('empresas');

    this.empresas = this.empresasColeccion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const informacion = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...informacion };
        });
      })
    );
  }

  getEmpresas(){
    return this.empresas;
  }

  getEmpresa(id){
    return this.empresasColeccion.doc<Empresa>(id).valueChanges();
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