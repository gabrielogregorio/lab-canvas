Transformação da equação do efeito dopler para obter a velocidade

Equação base

```
f' = f * (v + k) / (v + x)
```

como k = radar e radar = 0, então

```
f' = f * v/(v + x)
```

Então multiplicamos por (v + x), para resolver o termo da direita

```
f' * (v+x) = f * v
```

então

```
f'v + f'x = f * v
```

então

```
f'x = (f * v) - f'v
```

então

```
f' = f + fΔ
```

então

```
(f+fΔ)x = fv - (f + fΔ)v
```

então

```
(f+fΔ)x = fv - fv + fΔv
```

então

```
(f+fΔ)x = fΔv
```

portanto `x =  fΔv/(f+fΔ)`

então podemos fazer essa função

```
frequencyChange = fΔ = f' - f

x = (frequencyChange * speedWave) / (baseFrequency + frequencyChange)
```

