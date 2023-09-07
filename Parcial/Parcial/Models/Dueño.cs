using System;
using System.Collections.Generic;

namespace Parcial.Models;

public partial class Dueño
{
    public int IdDueño { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public virtual ICollection<Mascotum> Mascota { get; set; } = new List<Mascotum>();
}
