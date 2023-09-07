using System;
using System.Collections.Generic;

namespace Parcial.Models;

public partial class Comidum
{
    public int IdComida { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Tipo { get; set; }

    public decimal? Precio { get; set; }

    public string? Descripcion { get; set; }
}
