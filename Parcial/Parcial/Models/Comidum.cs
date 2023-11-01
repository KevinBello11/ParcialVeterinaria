using System;
using System.Collections.Generic;

namespace Parcial.Models;

public partial class Comidum
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Tipo { get; set; }

    public decimal? Precio { get; set; }

    public string? Descripcion { get; set; }
}
