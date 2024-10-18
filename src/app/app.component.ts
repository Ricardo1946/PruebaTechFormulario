import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DocumentoService } from './data/Documento.services';  // Importar el servicio

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title='formulario';
  documentForm: FormGroup;
  tiposDocumento: string[] = ['Cédula de ciudadanía', 'Pasaporte'];

  constructor(private fb: FormBuilder, private DocumentoService: DocumentoService) {
    this.documentForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11),
        Validators.pattern(/^[0-9]*$/)
      ]]
    });
  }
  ngOnInit(): void {
    this.DocumentoService.getTiposDocumento().subscribe(data => {
      this.tiposDocumento = data.tiposDocumento;
    });
  }
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const formattedValue = this.formatNumber(inputElement.value);
    this.documentForm.get('numeroDocumento')?.setValue(formattedValue, { emitEvent: false });
  }

  formatNumber(value: string): string {
    return value.replace(/\D/g, '');
  }
  onSubmit(): void {
    if (this.documentForm.valid) {
      console.log(this.documentForm.value);
    }
  }
}
