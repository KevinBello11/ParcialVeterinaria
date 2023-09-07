using System;
using System.Collections.Generic;

namespace Parcial.Models;

public partial class Mascotum
{
    public int IdMascota { get; set; }

    public string Nombre { get; set; } = null!;

    public string Especie { get; set; } = null!;

    public string? Raza { get; set; }

    public DateTime? FechaNacimiento { get; set; }

    public int? IdDueño { get; set; }

    public virtual Dueño? IdDueñoNavigation { get; set; }
}
