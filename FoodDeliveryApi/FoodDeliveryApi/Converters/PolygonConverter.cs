﻿using AutoMapper;
using NetTopologySuite.Geometries;

namespace FoodDeliveryApi.Converters
{
    public class CoordinatesToPolygonConverter : ITypeConverter<List<Coordinate>, Polygon>
    {
        public Polygon Convert(List<Coordinate> source, Polygon destination, ResolutionContext context)
        {
            return new Polygon(new LinearRing(source.ToArray()));
        }
    }
}