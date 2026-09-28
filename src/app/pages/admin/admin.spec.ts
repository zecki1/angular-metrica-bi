import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminPage } from './admin';

describe('AdminPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminPage],
      providers: [provideRouter([])],
    });
  });

  it('deve criar e expor o título da página', () => {
    const fixture = TestBed.createComponent(AdminPage);
    expect(fixture.componentInstance.titulo).toBe('Admin');
  });
});
