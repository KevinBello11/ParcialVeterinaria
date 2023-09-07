using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Parcial.Models;

public partial class VeterinariaContext : DbContext
{
    public VeterinariaContext()
    {
    }

    public VeterinariaContext(DbContextOptions<VeterinariaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Comidum> Comida { get; set; }

    public virtual DbSet<Dueño> Dueños { get; set; }

    public virtual DbSet<Mascotum> Mascota { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-PTBTBKM\\SQL2022; Database=Veterinaria; Trusted_Connection=True; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comidum>(entity =>
        {
            entity.HasKey(e => e.IdComida).HasName("PK__comida__C67C28376C40C8CF");

            entity.ToTable("comida");

            entity.Property(e => e.IdComida).HasColumnName("id_comida");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precio");
            entity.Property(e => e.Tipo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("tipo");
        });

        modelBuilder.Entity<Dueño>(entity =>
        {
            entity.HasKey(e => e.IdDueño).HasName("PK__dueño__3C7AED5B6797C435");

            entity.ToTable("dueño");

            entity.Property(e => e.IdDueño).HasColumnName("id_dueño");
            entity.Property(e => e.Apellido)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<Mascotum>(entity =>
        {
            entity.HasKey(e => e.IdMascota).HasName("PK__mascota__6F037352F57C6D97");

            entity.ToTable("mascota");

            entity.Property(e => e.IdMascota).HasColumnName("id_mascota");
            entity.Property(e => e.Especie)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("especie");
            entity.Property(e => e.FechaNacimiento)
                .HasColumnType("date")
                .HasColumnName("fecha_nacimiento");
            entity.Property(e => e.IdDueño).HasColumnName("id_dueño");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Raza)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("raza");

            entity.HasOne(d => d.IdDueñoNavigation).WithMany(p => p.Mascota)
                .HasForeignKey(d => d.IdDueño)
                .HasConstraintName("FK__mascota__id_dueñ__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
