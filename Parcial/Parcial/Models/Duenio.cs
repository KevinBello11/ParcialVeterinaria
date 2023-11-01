using System;
using System.Collections.Generic;

namespace Parcial.Models;

public partial class Duenio
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }
}
