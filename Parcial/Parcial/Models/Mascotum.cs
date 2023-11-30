using System;
using System.Collections.Generic;

namespace Parcial.Models;

public partial class Mascotum
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Especie { get; set; }

    public string? Raza { get; set; }

    public DateTime? FechaNacimiento { get; set; }
}
