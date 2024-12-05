import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  public constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercept requests to log or modify as needed
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add authentication tokens or other headers here
        console.log('Request:', config);

        return config;
      },
      (error: Error) => {
        return Promise.reject(error);
      },
    );

    // Intercept responses to handle errors globally
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: Error) => {
        console.error('Response error:', error);

        return Promise.reject(error);
      },
    );
  }

  // Perform GET request
  public async get<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
      params,
      ...config,
    });

    return response.data;
  }

  // Perform POST request
  public async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config,
    );

    return response.data;
  }

  // Perform PUT request
  public async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config,
    );

    return response.data;
  }

  // Perform DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config,
    );

    return response.data;
  }

  // Perform PATCH request
  public async patch<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      config,
    );

    return response.data;
  }
}

export default ApiService;
