using AutoMapper;
using NetTopologySuite.Geometries;

namespace FoodDeliveryServer.Core.Converters
{
    public class CoordinateToPointConverter : ITypeConverter<Coordinate, Point>
    {
        public Point Convert(Coordinate source, Point destination, ResolutionContext context)
        {
            return new Point(source);
        }
    }

    public class PointToCoordinateConverter : ITypeConverter<Point, Coordinate>
    {
        public Coordinate Convert(Point source, Coordinate destination, ResolutionContext context)
        {
            return new Coordinate(source.X, source.Y);
        }
    }
}
