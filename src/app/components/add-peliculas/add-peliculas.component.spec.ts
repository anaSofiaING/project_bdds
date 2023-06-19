import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeliculasComponent } from './add-peliculas.component';

describe('AddPeliculasComponent', () => {
  let component: AddPeliculasComponent;
  let fixture: ComponentFixture<AddPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPeliculasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
