import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductDetailsDialogComponent } from './update-product-details-dialog.component';

describe('UpdateProductDetailsDialogComponent', () => {
  let component: UpdateProductDetailsDialogComponent;
  let fixture: ComponentFixture<UpdateProductDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProductDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
