import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewOsPage } from './new-os.page';

describe('NewOsPage', () => {
  let component: NewOsPage;
  let fixture: ComponentFixture<NewOsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewOsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
