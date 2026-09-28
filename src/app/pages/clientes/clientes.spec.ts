import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClientesPage } from './clientes';

describe('ClientesPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientesPage],
      providers: [provideRouter([])],
    });
  });

  it('deve criar e expor o título da página', () => {
    const fixture = TestBed.createComponent(ClientesPage);
    expect(fixture.componentInstance.titulo).toBe('Clientes');
  });
});
