<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card" style="width:1280px;">
      <header class="modal-card-head">
        <p class="modal-card-title"></p>
        <div class="buttons has-addons is-right">
          <button class="delete is-right" aria-label="close" @click="closeModal"></button>
        </div>
      </header>
      <section class="modal-card-body">
        <h2
          class="subtitle"
          align="center"
        >Meta a proponerme según la calificiación obtenida en la evalución Líder PHD</h2>
        <table class="table">
          <thead class="has-background-primary">
            <tr>
              <th class="has-text-white">Puntaje en la competencia</th>
              <th class="has-text-white">Meta a proponerse en puntos</th>
              <th class="has-text-white">Puntaje en la competencia</th>
              <th class="has-text-white">Meta a proponerse en puntos</th>
              <th class="has-text-white">Puntaje en la competencia</th>
              <th class="has-text-white">Meta a proponerse en puntos</th>
              <th class="has-text-white">Puntaje en la competencia</th>
              <th class="has-text-white">Meta a proponerse en puntos</th>
              <th class="has-text-white">Puntaje en la competencia</th>
              <th class="has-text-white">Meta a proponerse en puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th align="center">1</th>
              <td class="has-background-grey-lighter" align="center">21.0</td>
              <th align="center">21</th>
              <td class="has-background-grey-lighter" align="center">16.4</td>
              <th align="center">41</th>
              <td class="has-background-grey-lighter" align="center">11.8</td>
              <th align="center">61</th>
              <td class="has-background-grey-lighter" align="center">7.2</td>
              <th align="center">81</th>
              <td class="has-background-grey-lighter" align="center">2.6</td>
            </tr>
            <tr>
              <th align="center">2</th>
              <td class="has-background-grey-lighter" align="center">20.7</td>
              <th align="center">22</th>
              <td class="has-background-grey-lighter" align="center">16.1</td>
              <th align="center">42</th>
              <td class="has-background-grey-lighter" align="center">11.5</td>
              <th align="center">62</th>
              <td class="has-background-grey-lighter" align="center">6.9</td>
              <th align="center">82</th>
              <td class="has-background-grey-lighter" align="center">2.3</td>
            </tr>
            <tr>
              <th align="center">3</th>
              <td class="has-background-grey-lighter" align="center">20.5</td>
              <th align="center">23</th>
              <td class="has-background-grey-lighter" align="center">15.9</td>
              <th align="center">43</th>
              <td class="has-background-grey-lighter" align="center">11.3</td>
              <th align="center">63</th>
              <td class="has-background-grey-lighter" align="center">6.7</td>
              <th align="center">83</th>
              <td class="has-background-grey-lighter" align="center">2.1</td>
            </tr>
            <tr>
              <th align="center">4</th>
              <td class="has-background-grey-lighter" align="center">20.3</td>
              <th align="center">24</th>
              <td class="has-background-grey-lighter" align="center">15.7</td>
              <th align="center">44</th>
              <td class="has-background-grey-lighter" align="center">11.1</td>
              <th align="center">64</th>
              <td class="has-background-grey-lighter" align="center">6.5</td>
              <th align="center">84</th>
              <td class="has-background-grey-lighter" align="center">1.9</td>
            </tr>
            <tr>
              <th align="center">5</th>
              <td class="has-background-grey-lighter" align="center">20.1</td>
              <th align="center">25</th>
              <td class="has-background-grey-lighter" align="center">15.4</td>
              <th align="center">45</th>
              <td class="has-background-grey-lighter" align="center">10.8</td>
              <th align="center">65</th>
              <td class="has-background-grey-lighter" align="center">6.2</td>
              <th align="center">85</th>
              <td class="has-background-grey-lighter" align="center">1.6</td>
            </tr>
            <tr>
              <th align="center">6</th>
              <td class="has-background-grey-lighter" align="center">19.8</td>
              <th align="center">26</th>
              <td class="has-background-grey-lighter" align="center">15.2</td>
              <th align="center">46</th>
              <td class="has-background-grey-lighter" align="center">10.6</td>
              <th align="center">66</th>
              <td class="has-background-grey-lighter" align="center">6.0</td>
              <th align="center">86</th>
              <td class="has-background-grey-lighter" align="center">1.4</td>
            </tr>
            <tr>
              <th align="center">7</th>
              <td class="has-background-grey-lighter" align="center">19.6</td>
              <th align="center">27</th>
              <td class="has-background-grey-lighter" align="center">15.0</td>
              <th align="center">47</th>
              <td class="has-background-grey-lighter" align="center">10.4</td>
              <th align="center">67</th>
              <td class="has-background-grey-lighter" align="center">5.8</td>
              <th align="center">87</th>
              <td class="has-background-grey-lighter" align="center">1.2</td>
            </tr>
            <tr>
              <th align="center">8</th>
              <td class="has-background-grey-lighter" align="center">19.4</td>
              <th align="center">28</th>
              <td class="has-background-grey-lighter" align="center">14.8</td>
              <th align="center">48</th>
              <td class="has-background-grey-lighter" align="center">10.2</td>
              <th align="center">68</th>
              <td class="has-background-grey-lighter" align="center">5.6</td>
              <th align="center">88</th>
              <td class="has-background-grey-lighter" align="center">1.0</td>
            </tr>
            <tr>
              <th align="center">9</th>
              <td class="has-background-grey-lighter" align="center">19.1</td>
              <th align="center">29</th>
              <td class="has-background-grey-lighter" align="center">14.5</td>
              <th align="center">49</th>
              <td class="has-background-grey-lighter" align="center">9.9</td>
              <th align="center">69</th>
              <td class="has-background-grey-lighter" align="center">5.3</td>
              <th align="center">89</th>
              <td class="has-background-grey-lighter" align="center">0.7</td>
            </tr>
            <tr>
              <th align="center">10</th>
              <td class="has-background-grey-lighter" align="center">18.9</td>
              <th align="center">30</th>
              <td class="has-background-grey-lighter" align="center">14.3</td>
              <th align="center">50</th>
              <td class="has-background-grey-lighter" align="center">9.7</td>
              <th align="center">70</th>
              <td class="has-background-grey-lighter" align="center">5.1</td>
              <th align="center">90</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">11</th>
              <td class="has-background-grey-lighter" align="center">18.7</td>
              <th align="center">31</th>
              <td class="has-background-grey-lighter" align="center">14.1</td>
              <th align="center">51</th>
              <td class="has-background-grey-lighter" align="center">9.5</td>
              <th align="center">71</th>
              <td class="has-background-grey-lighter" align="center">4.9</td>
              <th align="center">91</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">12</th>
              <td class="has-background-grey-lighter" align="center">18.4</td>
              <th align="center">32</th>
              <td class="has-background-grey-lighter" align="center">13.8</td>
              <th align="center">52</th>
              <td class="has-background-grey-lighter" align="center">9.2</td>
              <th align="center">72</th>
              <td class="has-background-grey-lighter" align="center">4.6</td>
              <th align="center">92</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">13</th>
              <td class="has-background-grey-lighter" align="center">18.2</td>
              <th align="center">33</th>
              <td class="has-background-grey-lighter" align="center">13.6</td>
              <th align="center">53</th>
              <td class="has-background-grey-lighter" align="center">9.0</td>
              <th align="center">73</th>
              <td class="has-background-grey-lighter" align="center">4.4</td>
              <th align="center">93</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">14</th>
              <td class="has-background-grey-lighter" align="center">18.0</td>
              <th align="center">34</th>
              <td class="has-background-grey-lighter" align="center">13.4</td>
              <th align="center">54</th>
              <td class="has-background-grey-lighter" align="center">8.8</td>
              <th align="center">74</th>
              <td class="has-background-grey-lighter" align="center">4.2</td>
              <th align="center">94</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">15</th>
              <td class="has-background-grey-lighter" align="center">17.8</td>
              <th align="center">35</th>
              <td class="has-background-grey-lighter" align="center">13.2</td>
              <th align="center">55</th>
              <td class="has-background-grey-lighter" align="center">8.6</td>
              <th align="center">75</th>
              <td class="has-background-grey-lighter" align="center">4.0</td>
              <th align="center">95</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">16</th>
              <td class="has-background-grey-lighter" align="center">17.5</td>
              <th align="center">36</th>
              <td class="has-background-grey-lighter" align="center">12.9</td>
              <th align="center">56</th>
              <td class="has-background-grey-lighter" align="center">8.3</td>
              <th align="center">76</th>
              <td class="has-background-grey-lighter" align="center">3.7</td>
              <th align="center">96</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">17</th>
              <td class="has-background-grey-lighter" align="center">17.3</td>
              <th align="center">37</th>
              <td class="has-background-grey-lighter" align="center">12.7</td>
              <th align="center">57</th>
              <td class="has-background-grey-lighter" align="center">8.1</td>
              <th align="center">77</th>
              <td class="has-background-grey-lighter" align="center">3.5</td>
              <th align="center">97</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">18</th>
              <td class="has-background-grey-lighter" align="center">17.1</td>
              <th align="center">38</th>
              <td class="has-background-grey-lighter" align="center">12.5</td>
              <th align="center">58</th>
              <td class="has-background-grey-lighter" align="center">7.9</td>
              <th align="center">78</th>
              <td class="has-background-grey-lighter" align="center">3.3</td>
              <th align="center">98</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">19</th>
              <td class="has-background-grey-lighter" align="center">16.8</td>
              <th align="center">39</th>
              <td class="has-background-grey-lighter" align="center">12.2</td>
              <th align="center">59</th>
              <td class="has-background-grey-lighter" align="center">7.6</td>
              <th align="center">79</th>
              <td class="has-background-grey-lighter" align="center">3.0</td>
              <th align="center">99</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
            <tr>
              <th align="center">20</th>
              <td class="has-background-grey-lighter" align="center">16.6</td>
              <th align="center">40</th>
              <td class="has-background-grey-lighter" align="center">12.0</td>
              <th align="center">60</th>
              <td class="has-background-grey-lighter" align="center">7.4</td>
              <th align="center">80</th>
              <td class="has-background-grey-lighter" align="center">2.8</td>
              <th align="center">100</th>
              <td class="has-background-grey-lighter" align="center">Mantenerse</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruta: "",
      pass: "",
      id: ""
    };
  },
  props: {
    show: Boolean
  },
  methods: {
    closeModal() {
      this.$emit("showmodalgoals", false);
    }
  }
};
</script>