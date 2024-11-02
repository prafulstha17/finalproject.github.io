namespace GenerateCV.Model
{
    public class BaseResponseModel<T>
    {
        public string? Code { get; set; }
        public string? Message { get; set; }
        public string? Status { get; set; }
        public T? Data { get; set; }
    }
}
