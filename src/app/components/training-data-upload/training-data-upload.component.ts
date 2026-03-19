import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingDataService } from '../../services/training-data.service';

@Component({
  selector: 'app-training-data-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './training-data-upload.component.html',
  styleUrl: './training-data-upload.component.scss'
})
export class TrainingDataUploadComponent {
  selectedFile = signal<File | null>(null);
  company = signal<string>('');
  monthYear = signal<string>('');
  isLoading = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  constructor(private trainingDataService: TrainingDataService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
      this.errorMessage.set('');
    }
  }

  onSubmit(): void {
    const file = this.selectedFile();
    const companyValue = this.company();
    const monthYearValue = this.monthYear();

    // Validation
    if (!file) {
      this.errorMessage.set('Please select a file');
      return;
    }

    if (!companyValue.trim()) {
      this.errorMessage.set('Please enter company name');
      return;
    }

    if (!monthYearValue.trim()) {
      this.errorMessage.set('Please enter month and year');
      return;
    }

    this.isLoading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    this.trainingDataService.uploadTrainingData(file, companyValue, monthYearValue)
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.successMessage.set('File uploaded successfully!');
          this.resetForm();
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(`Error: ${error.error?.message || error.message || 'Failed to upload file'}`);
        }
      });
  }

  resetForm(): void {
    this.selectedFile.set(null);
    this.company.set('');
    this.monthYear.set('');
  }

  get fileName(): string {
    return this.selectedFile()?.name || 'No file chosen';
  }
}
